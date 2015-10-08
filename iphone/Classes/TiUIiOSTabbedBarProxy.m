/**
 * Appcelerator Titanium Mobile
 * Copyright (c) 2009-2010 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 */
#if defined(USE_TI_UIIOSTABBEDBAR) || defined(USE_TI_UITABBEDBAR)
#import "TiUIiOSTabbedBarProxy.h"
#import "TiUIButtonBar.h"

@implementation TiUIiOSTabbedBarProxy


-(NSArray*)keySequence
{
    static NSArray* tabbedKeySequence = nil;
	if (tabbedKeySequence == nil) {
		tabbedKeySequence = [[NSArray alloc] initWithObjects:@"labels",@"style",nil];
	}
	return tabbedKeySequence;
}

-(NSString*)apiName
{
    return @"Ti.UI.iOS.TabbedBar";
}

-(TiUIView*)newView
{
	TiUIButtonBar * result = [[TiUIButtonBar alloc] init];
	[result setTabbedBar:YES];
	return result;
}

@end
#endif