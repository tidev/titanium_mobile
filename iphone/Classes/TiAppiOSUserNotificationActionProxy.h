/**
 * Appcelerator Titanium Mobile
 * Copyright (c) 2009-2016 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 */

#import "TiProxy.h"

#ifdef USE_TI_APPIOS
#import <UserNotifications/UserNotifications.h>

@interface TiAppiOSUserNotificationActionProxy : TiProxy

@property (nonatomic, retain) id notificationAction;

@end

#endif
