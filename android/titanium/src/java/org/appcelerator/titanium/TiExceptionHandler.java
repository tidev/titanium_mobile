/**
 * Appcelerator Titanium Mobile
 * Copyright (c) 2009-2018 by Axway, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 */
package org.appcelerator.titanium;

import java.util.Arrays;
import java.util.LinkedList;

import org.appcelerator.kroll.KrollApplication;
import org.appcelerator.kroll.KrollDict;
import org.appcelerator.kroll.KrollExceptionHandler;
import org.appcelerator.kroll.KrollRuntime;
import org.appcelerator.kroll.common.AsyncResult;
import org.appcelerator.kroll.common.CurrentActivityListener;
import org.appcelerator.kroll.common.Log;
import org.appcelerator.kroll.common.TiMessenger;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.DialogInterface.OnClickListener;
import android.graphics.Rect;
import android.graphics.Typeface;
import android.os.Handler;
import android.os.Message;
import android.os.Process;
import android.text.InputType;
import android.text.method.ScrollingMovementMethod;
import android.view.Window;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.Scroller;
import android.widget.TextView;

/**
 * A utility class for creating a dialog that displays Javascript errors
 */
public class TiExceptionHandler implements Handler.Callback, KrollExceptionHandler
{
	private static final String TAG = "TiExceptionHandler";
	private static final int MSG_OPEN_ERROR_DIALOG = 10011;
	private static LinkedList<ExceptionMessage> errorMessages = new LinkedList<ExceptionMessage>();
	private static boolean dialogShowing = false;
	private static Handler mainHandler;

	private static final String fill(int count)
	{
		char[] string = new char[count];
		Arrays.fill(string, ' ');
		return new String(string);
	}

	private static String getError(KrollDict error)
	{
		String message = new String();
		message += error.getString("sourceName") + ":" + error.getString("line") + "\n";
		if (error.containsKeyAndNotNull("lineSource")) {
			message += error.getString("lineSource") + "\n";
			message += fill(Integer.parseInt(error.getString("lineOffset")) - 1) + "^\n";
		}
		message += error.getString("message") + "\n";
		if (error.containsKeyAndNotNull("stack")) {
			message += error.getString("stack");
		}
		return message;
	}

	public TiExceptionHandler()
	{
		mainHandler = new Handler(TiMessenger.getMainMessenger().getLooper(), this);
	}

	public void openErrorDialog(ExceptionMessage error)
	{
		if (TiApplication.isUIThread()) {
			handleOpenErrorDialog(error);
		} else {
			TiMessenger.sendBlockingMainMessage(mainHandler.obtainMessage(MSG_OPEN_ERROR_DIALOG), error);
		}
	}

	protected static void handleOpenErrorDialog(final ExceptionMessage error)
	{
		TiApplication tiApp = TiApplication.getInstance();
		if (tiApp == null) {
			return;
		}

		Activity activity = tiApp.getRootOrCurrentActivity();
		if (activity == null || activity.isFinishing()) {
			return;
		}

		final KrollDict dict = new KrollDict();
		dict.put("title", error.title);
		dict.put("message", error.message);
		dict.put("sourceName", error.sourceName);
		dict.put("line", error.line);
		dict.put("lineSource", error.lineSource);
		dict.put("lineOffset", error.lineOffset);
		dict.put("stack", KrollRuntime.getInstance().getStackTrace());
		tiApp.fireAppEvent("uncaughtException", dict);

		Log.e(TAG, getError(dict));

		if (tiApp.getDeployType().equals(TiApplication.DEPLOY_TYPE_PRODUCTION)) {
			return;
		}

		if (!dialogShowing) {
			dialogShowing = true;
			tiApp.waitForCurrentActivity(new CurrentActivityListener() {
				@Override
				public void onCurrentActivityReady(Activity activity)
				{
					createDialog(dict);
				}
			});
		} else {
			errorMessages.add(error);
		}
	}

	protected static void createDialog(final KrollDict error)
	{
		final KrollApplication tiApp = KrollRuntime.getInstance().getKrollApplication();
		if (tiApp == null) {
			return;
		}

		final Context context = tiApp.getCurrentActivity();

		final TextView errorView = new TextView(context);
		errorView.setBackgroundColor(0xFFF5F5F5);
		errorView.setTextColor(0xFFE53935);
		errorView.setPadding(5, 5, 5, 5);
		errorView.setLayoutParams(new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT,
																LinearLayout.LayoutParams.MATCH_PARENT));
		errorView.setInputType(InputType.TYPE_TEXT_FLAG_MULTI_LINE);
		errorView.setSingleLine(false);
		errorView.setScroller(new Scroller(context));
		errorView.setVerticalScrollBarEnabled(true);
		errorView.setHorizontallyScrolling(true);
		errorView.setHorizontalScrollBarEnabled(true);
		errorView.setMovementMethod(new ScrollingMovementMethod());
		errorView.setTypeface(Typeface.MONOSPACE);
		errorView.setText(getError(error));

		final RelativeLayout layout = new RelativeLayout(context);
		layout.setPadding(0, 50, 0, 0);
		RelativeLayout.LayoutParams layoutParams = new RelativeLayout.LayoutParams(
			RelativeLayout.LayoutParams.MATCH_PARENT, RelativeLayout.LayoutParams.MATCH_PARENT);
		layout.setLayoutParams(layoutParams);
		layout.addView(errorView);

		final OnClickListener clickListener = new OnClickListener() {
			public void onClick(DialogInterface dialog, int which)
			{
				if (which == DialogInterface.BUTTON_POSITIVE) {
					Process.killProcess(Process.myPid());
				}
				if (!errorMessages.isEmpty()) {
					handleOpenErrorDialog(errorMessages.removeFirst());
				} else {
					dialogShowing = false;
				}
			}
		};

		final AlertDialog.Builder builder = new AlertDialog.Builder(context)
												.setTitle(error.getString("title"))
												.setView(layout)
												.setPositiveButton("Kill", clickListener)
												.setNeutralButton("Continue", clickListener)
												.setCancelable(false);

		final AlertDialog dialog = builder.create();
		dialog.show();

		Window window = ((Activity) context).getWindow();
		Rect displayRect = new Rect();
		window.getDecorView().getWindowVisibleDisplayFrame(displayRect);
		dialog.getWindow().setLayout(displayRect.width(), (int) (displayRect.height() * 0.95));
	}

	public boolean handleMessage(Message msg)
	{
		switch (msg.what) {
			case MSG_OPEN_ERROR_DIALOG:
				AsyncResult asyncResult = (AsyncResult) msg.obj;
				ExceptionMessage errorMessage = (ExceptionMessage) asyncResult.getArg();
				handleOpenErrorDialog(errorMessage);
				asyncResult.setResult(null);
				return true;
			default:
				break;
		}

		return false;
	}

	/**
	 * Handles the exception by opening an error dialog with an error message
	 * @param error An error message containing line number, error title, message, etc
	 * @module.api
	 */
	public void handleException(ExceptionMessage error)
	{
		openErrorDialog(error);
	}
}
