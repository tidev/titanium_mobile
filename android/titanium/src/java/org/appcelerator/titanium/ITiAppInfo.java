/**
 * Titanium SDK
 * Copyright TiDev, Inc. 04/07/2022-Present
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 */
package org.appcelerator.titanium;

public interface ITiAppInfo {
	String getId();
	String getName();
	String getVersion();
	String getPublisher();
	String getUrl();
	String getCopyright();
	String getDescription();
	String getIcon();
	String getGUID();
	boolean isFullscreen();
	String getDeployType();
	String getBuildType();
}
