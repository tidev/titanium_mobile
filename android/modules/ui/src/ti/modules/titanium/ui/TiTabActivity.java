/**
 * Appcelerator Titanium Mobile
 * Copyright (c) 2009-2010 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 */
package ti.modules.titanium.ui;

import org.appcelerator.titanium.TiApplication;
import org.appcelerator.titanium.TiRootActivity;
import org.appcelerator.titanium.util.Log;
import org.appcelerator.titanium.util.TiConfig;
import org.appcelerator.titanium.view.ITiWindowHandler;
import org.appcelerator.titanium.view.TiCompositeLayout;
import org.appcelerator.titanium.view.TiCompositeLayout.LayoutParams;

import android.app.ActivityGroup;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.os.Messenger;
import android.os.RemoteException;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;

import ti.modules.titanium.ui.ViewProxy;

import android.view.ViewGroup;

public class TiTabActivity extends ActivityGroup
	implements ITiWindowHandler
{
	private static final String LCAT = "TiTabActivity";
	private static final boolean DBG = TiConfig.LOGD;

	protected TiCompositeLayout layout;
	protected TabGroupProxy proxy;
	protected Handler handler;

	public TiTabActivity() {
	}

	public void setTabGroupProxy(TabGroupProxy proxy) {
		this.proxy = proxy;
	}

	@Override
	protected void onCreate(Bundle savedInstanceState)
	{
		super.onCreate(savedInstanceState);
		handler = new Handler();

		Intent intent = getIntent();

		boolean fullscreen = false;
		boolean navbar = false;
		Messenger messenger = null;
		Integer messageId = null;
		boolean vertical = false;
		boolean titleControl = false;

		if (intent != null) {
			if (intent.hasExtra("fullscreen")) {
				fullscreen = intent.getBooleanExtra("fullscreen", fullscreen);
			}
			if (intent.hasExtra("navBarHidden")) {
				navbar = !intent.getBooleanExtra("navBarHidden", navbar);
			}
			if (intent.hasExtra("messenger")) {
				messenger = (Messenger) intent.getParcelableExtra("messenger");
				messageId = intent.getIntExtra("messageId", -1);
			}
			if (intent.hasExtra("vertical")) {
				vertical = intent.getBooleanExtra("vertical", vertical);
			}
			if (intent.hasExtra("titleControl")) {
				titleControl = intent.getBooleanExtra("titleControl", titleControl);
			}
		}

		layout = new TiCompositeLayout(this, vertical);

		if (fullscreen) {
			getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
					WindowManager.LayoutParams.FLAG_FULLSCREEN);
		}

		if(titleControl){
			this.requestWindowFeature(Window.FEATURE_CUSTOM_TITLE);
		}else if (navbar) {
			this.requestWindowFeature(Window.FEATURE_LEFT_ICON); // TODO Keep?
			this.requestWindowFeature(Window.FEATURE_RIGHT_ICON);
			this.requestWindowFeature(Window.FEATURE_PROGRESS);
			this.requestWindowFeature(Window.FEATURE_INDETERMINATE_PROGRESS);
		} else {
			this.requestWindowFeature(Window.FEATURE_NO_TITLE);
		}

		setContentView(layout);

		// Notify caller that onCreate is done. Use post
		// to prevent deadlock.
		final TiTabActivity me = this;
		final Messenger fMessenger = messenger;
		final int fMessageId = messageId;
		handler.post(new Runnable() {
			@Override
			public void run() {
				if (fMessenger != null) {
					try {
						Message msg = Message.obtain();
						msg.what = fMessageId;
						msg.obj = me;
						if (fMessenger.getBinder().pingBinder()) {
							fMessenger.send(msg);
							Log.w(LCAT, "Notifying TiTabGroup, activity is created");
						} else {
							me.finish();
						}
					} catch (RemoteException e) {
						Log.e(LCAT, "Unable to message creator. finishing.");
						me.finish();
					} catch (RuntimeException e) {
						Log.w(LCAT, "Run-time exception: " + e.getMessage(), e);
					}
				}
			}
		});
		
	}

	public TiApplication getTiApp() {
		return (TiApplication) getApplication();
	}

	public TiCompositeLayout getLayout() {
		return layout;
	}

	public void setTitleControl(ViewProxy v){
		try{
			int titleContainerId = (Integer) Class.forName("com.android.internal.R$id").getField("title_container").get(null);
			((ViewGroup) getWindow().findViewById(titleContainerId)).removeAllViews();
			((ViewGroup) getWindow().findViewById(titleContainerId)).setPadding(0, 0, 0, 0);
			((ViewGroup) getWindow().findViewById(titleContainerId)).setBackgroundResource(android.R.color.transparent);
			((ViewGroup) getWindow().findViewById(titleContainerId)).addView(v.getView(this).getNativeView());
		}catch(Exception ex){
				Log.d(LCAT, "couldn't set titleControl on tabGroup ", ex);
		}
	}

	@Override
	public void addWindow(View v, LayoutParams params) {
		layout.addView(v, params);
	}

	@Override
	public void removeWindow(View v) {
		layout.removeView(v);
	}

	@Override
	public void finish()
	{
		Intent intent = getIntent();
		if (intent != null) {
			if (intent.getBooleanExtra("finishRoot", false)) {
				if (getApplication() != null) {
					TiApplication tiApp = getTiApp();
					if (tiApp != null) {
						TiRootActivity rootActivity = tiApp.getRootActivity();
						if (rootActivity != null) {
							rootActivity.finish();
						}
					}
				}
			}
		}
		
		super.finish();
	}

	@Override
	protected void onPause() {
		super.onPause();
		getTiApp().setWindowHandler(null);
		((TiApplication) getApplication()).setCurrentActivity(this, null);
	}

	@Override
	protected void onResume() {
		super.onResume();
		getTiApp().setWindowHandler(this);
		((TiApplication) getApplication()).setCurrentActivity(this, this);
	}



	@Override
	protected void onDestroy()
	{
		super.onDestroy();
		if (layout != null) {
			layout.removeAllViews();
			layout = null;
		}
		if (proxy != null) {
			proxy.closeFromActivity();
			proxy = null;
		}
		
		handler = null;
	}

}
