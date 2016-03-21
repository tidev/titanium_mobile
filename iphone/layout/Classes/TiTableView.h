/**
 * Appcelerator Titanium Mobile
 * Copyright (c) 2009-2015 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 */

#import "TiLayoutView.h"

@interface TiTableViewRow : UITableViewCell
{
    CGFloat _width;
    CGFloat _height;
    TiDimension _tiHeight;
}

@property (nonatomic, retain) TiLayoutView* parentView;

-(CGFloat)heightFromWidth:(CGFloat)width;
-(void)setHeight_:(id)args;
-(void)setLayout_:(id)args;
@end

@interface TiTableView : TiLayoutView<UITableViewDataSource, UITableViewDelegate>

@property (nonatomic, retain) NSArray* tableData;

@end
