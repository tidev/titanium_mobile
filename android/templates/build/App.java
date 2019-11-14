/* AUTO-GENERATED FILE.  DO NOT MODIFY.
 *
 * This class was automatically generated by
 * Appcelerator. It should not be modified by hand.
 */
package <%= appid %>;

import org.appcelerator.kroll.runtime.v8.V8Runtime;

import org.appcelerator.kroll.KrollExternalModule;
import org.appcelerator.kroll.common.KrollSourceCodeProvider;
import org.appcelerator.kroll.KrollModule;
import org.appcelerator.kroll.KrollModuleInfo;
import org.appcelerator.kroll.KrollRuntime;
import org.appcelerator.kroll.util.KrollAssetCache;
import org.appcelerator.kroll.util.KrollAssetHelper;
import org.appcelerator.titanium.TiApplication;
import org.appcelerator.titanium.TiRootActivity;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.List;
import java.util.ArrayList;
import java.util.HashMap;

import android.util.Log;

public final class<%= classname %> Application extends TiApplication
{
	private static final String TAG = "<%= classname %>Application";

	@Override
	@SuppressWarnings("unchecked")
	public void onCreate()
	{
		< % if (encryptJS)
		{
			% > KrollAssetHelper.setAssetCrypt(new AssetCryptImpl());
			< %
		}
		% >

			// Load cache as soon as possible.
			KrollAssetCache.init(this);

		super.onCreate();

		appInfo = new<%= classname %> AppInfo(this);
		postAppInfo();

		V8Runtime runtime = new V8Runtime();

<% customModules.forEach(function (module) {
			% >
			{
				< % if ((typeof module.manifest.minsdk == = 'string')
						&& (parseInt(module.manifest.minsdk.split('.')) >= 9))
				{
					% > String className = "<%- module.manifest.moduleid %>.TiModuleBootstrap";
					< %
				}
				else
				{
					% > String className = "<%- module.manifest.moduleid %>.<%- module.apiName %>Bootstrap";
					< %
				}
				% > try {
					runtime.addExternalModule("<%- module.manifest.moduleid %>",
											  (Class<KrollExternalModule>) Class.forName(className));
				} catch (Throwable ex) {
					Log.e(TAG, "Failed to add external module: " + className);
					if ((ex instanceof RuntimeException) == false) {
						ex = new RuntimeException(ex);
					}
					throw(RuntimeException) ex;
				}
			}
			< % if (module.isNativeJsModule){
				% > { String className = "<%- module.manifest.moduleid %>.CommonJsSourceProvider";
			try {
				runtime.addExternalCommonJsModule("<%- module.manifest.moduleid %>",
												  (Class<KrollSourceCodeProvider>) Class.forName(className));
			} catch (Throwable ex) {
				Log.e(TAG, "Failed to add external CommonJS module: " + className);
				if ((ex instanceof RuntimeException) == false) {
					ex = new RuntimeException(ex);
				}
				throw(RuntimeException) ex;
			}
		}
		<%
	}
	% > < %
});
% >

	KrollRuntime.init(this, runtime);

postOnCreate();

< % if (customModules.length)
{
	% >
		// Custom modules
		KrollModuleInfo moduleInfo;
	<% customModules.forEach(function (module) {
		% > < % if (module.onAppCreate){ % > { String className = "<%- module.className %>";
		String methodName = "<%- module.onAppCreate %>";
		try {
			Class moduleClass = Class.forName(className);
			Method moduleMethod = moduleClass.getMethod(methodName, TiApplication.class);
			moduleMethod.invoke(null, this);
		} catch (Throwable ex) {
			Log.e(TAG, "Error invoking: " + className + "." + methodName + "()");
			if ((ex instanceof InvocationTargetException) && (ex.getCause() != null)) {
				ex = ex.getCause();
			}
			if ((ex instanceof RuntimeException) == false) {
				ex = new RuntimeException(ex);
			}
			throw(RuntimeException) ex;
		}
		}
		<%
}
% >

	moduleInfo =
	new KrollModuleInfo("<%- module.manifest.name %>", "<%- module.manifest.moduleid %>", "<%- module.manifest.guid %>",
						"<%- module.manifest.version %>",
						"<%- (module.manifest.description || '').replace(/\\/g, '\\\\').replace(/\x22/g, '\\\x22') %>",
						"<%- (module.manifest.author || '').replace(/\\/g, '\\\\').replace(/\x22/g, '\\\x22') %>",
						"<%- (module.manifest.license || '').replace(/\\/g, '\\\\').replace(/\x22/g, '\\\x22') %>",
						"<%- (module.manifest.copyright || '').replace(/\\/g, '\\\\').replace(/\x22/g, '\\\x22') %>");

< % if (module.manifest.licensekey)
{
	% > moduleInfo.setLicenseKey("<%- module.manifest.licensekey %>");
	< %
}
% >

	< % if (module.isNativeJsModule)
{
	% > moduleInfo.setIsJSModule(true);
	< %
}
% >

	KrollModule.addCustomModuleInfo(moduleInfo);
< %
});
% > < %
}
% >
}

@Override
public void verifyCustomModules(TiRootActivity rootActivity)
{
	< % if (deployType != 'production')
	{
		% > org.appcelerator.titanium.TiVerify verify = new org.appcelerator.titanium.TiVerify(rootActivity, this);
		verify.verify();
		< %
	}
	% >
}
}
