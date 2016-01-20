/**
 * Appcelerator Titanium Mobile
 * Copyright (c) 2010-2015 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 */
#import "TiProxy.h"

#ifdef USE_TI_UIIOS

#ifdef USE_TI_UIIOSADVIEW
	#import "TiUIiOSAdViewProxy.h"
#endif

#ifdef USE_TI_UIIOSALERTDIALOGSTYLE
#import "TIUIiOSAlertDialogStyleProxy.h"
#endif

#ifdef USE_TI_UIIOSANIMATIONSTYLE
#import "TiUIiOSAnimationStyleProxy.h"
#endif

#if defined(USE_TI_UIIOSTABLEVIEWCELLSELECTIONSTYLE) || defined (USE_TI_UIIOSLISTVIEWCELLSELECTIONSTYLE)
#import "TiUIiOSTableViewCellSelectionStyleProxy.h"
#endif

#if defined(USE_TI_UIIOSTABLEVIEWSCROLLPOSITION) || defined(USE_TI_UIIOSLISTVIEWSCROLLPOSITION)
#import "TiUIiOSTableViewScrollPositionProxy.h"
#endif

#if defined(USE_TI_UIIOSTABLEVIEWSTYLE) || defined(USE_TI_UIIOSLISTVIEWSTYLE)
#import "TiUIiOSTableViewStyleProxy.h"
#endif

#ifdef USE_TI_UIIOSPROGRESSBARSTYLE
#import "TiUIiOSProgressBarStyleProxy.h"
#endif

#ifdef USE_TI_UIIOSROWANIMATIONSTYLE
#import "TiUIiOSRowAnimationStyleProxy.h"
#endif

#ifdef USE_TI_UIIOSSCROLLINDICATORSTYLE
#import "TiUIiOSScrollIndicatorStyleProxy.h"
#endif

#ifdef USE_TI_UIIOSSTATUSBAR
#import "TiUIiOSStatusBarProxy.h"
#endif

#ifdef USE_TI_UIIOSSYSTEMBUTTONSTYLE
#import "TiUIiOSSystemButtonStyleProxy.h"
#endif

#ifdef USE_TI_UIIOSSYSTEMBUTTON
#import "TiUIiOSSystemButtonProxy.h"
#endif

#ifdef USE_TI_UIIOSSYSTEMICON
#import "TiUIiOSSystemIconProxy.h"
#endif

#endif
@interface TiUIiOSProxy : TiProxy {
@private
#ifdef USE_TI_UIIOSANIMATIONSTYLE
    TiUIiOSAnimationStyleProxy* animationStyleProxy;
#endif

#ifdef USE_TI_UIIOSROWANIMATIONSTYLE
    TiUIiOSRowAnimationStyleProxy*RowAnimationStyle;
#endif
    
#ifdef USE_TI_UIIOSALERTDIALOGSTYLE
    TIUIiOSAlertDialogStyleProxy* AlertDialogStyle;
#endif
#if defined(USE_TI_UIIOSTABLEVIEWCELLSELECTIONSTYLE) || defined (USE_TI_UIIOSLISTVIEWCELLSELECTIONSTYLE)
    TiUIiOSTableViewCellSelectionStyleProxy*TableViewCellSelectionStyle;
    TiUIiOSTableViewCellSelectionStyleProxy*ListViewCellSelectionStyle;
#endif
    
#if defined(USE_TI_UIIOSTABLEVIEWSCROLLPOSITION) || defined(USE_TI_UIIOSLISTVIEWSCROLLPOSITION)
    TiUIiOSTableViewScrollPositionProxy*TableViewScrollPosition;
    TiUIiOSTableViewScrollPositionProxy*ListViewScrollPosition;
#endif
#if defined(USE_TI_UIIOSTABLEVIEWSTYLE) || defined(USE_TI_UIIOSLISTVIEWSTYLE)
    TiUIiOSTableViewStyleProxy*TableViewStyle;
    TiUIiOSTableViewStyleProxy*ListViewStyle;
#endif
    
#ifdef USE_TI_UIIOSPROGRESSBARSTYLE
    TiUIiOSProgressBarStyleProxy*ProgressBarStyle;
#endif

#ifdef USE_TI_UIIOSSCROLLINDICATORSTYLE
    TiUIiOSScrollIndicatorStyleProxy*ScrollIndicatorStyle;
#endif

#ifdef USE_TI_UIIOSSTATUSBAR
    TiUIiOSStatusBarProxy*StatusBar;
#endif
#ifdef USE_TI_UIIOSSYSTEMBUTTONSTYLE
    TiUIiOSSystemButtonStyleProxy*SystemButtonStyle;
#endif
    
#ifdef USE_TI_UIIOSSYSTEMBUTTON
    TiUIiOSSystemButtonProxy*SystemButton;
#endif
    
#ifdef USE_TI_UIIOSSYSTEMICON
    TiUIiOSSystemIconProxy*SystemIcon;
#endif
}

@property (nonatomic,readonly) NSNumber* SCROLL_DECELERATION_RATE_NORMAL;
@property (nonatomic,readonly) NSNumber* SCROLL_DECELERATION_RATE_FAST;
@property (nonatomic,readonly) NSNumber* CLIP_MODE_DEFAULT;
@property (nonatomic,readonly) NSNumber* CLIP_MODE_ENABLED;
@property (nonatomic,readonly) NSNumber* CLIP_MODE_DISABLED;

#ifdef USE_TI_UILISTVIEW
@property (nonatomic,readonly) NSNumber* ROW_ACTION_STYLE_DEFAULT;
@property (nonatomic,readonly) NSNumber* ROW_ACTION_STYLE_DESTRUCTIVE;
@property (nonatomic,readonly) NSNumber* ROW_ACTION_STYLE_NORMAL;
#endif

#ifdef USE_TI_UIIOSPREVIEWCONTEXT
@property (nonatomic,readonly) NSNumber* PREVIEW_ACTION_STYLE_DEFAULT;
@property (nonatomic,readonly) NSNumber* PREVIEW_ACTION_STYLE_DESTRUCTIVE;
@property (nonatomic,readonly) NSNumber* PREVIEW_ACTION_STYLE_SELECTED;
#endif

#ifdef USE_TI_UIIOSMENUPOPUP
@property (nonatomic,readonly) NSNumber* MENU_POPUP_ARROW_DIRECTION_UP;
@property (nonatomic,readonly) NSNumber* MENU_POPUP_ARROW_DIRECTION_DOWN;
@property (nonatomic,readonly) NSNumber* MENU_POPUP_ARROW_DIRECTION_LEFT;
@property (nonatomic,readonly) NSNumber* MENU_POPUP_ARROW_DIRECTION_RIGHT;
@property (nonatomic,readonly) NSNumber* MENU_POPUP_ARROW_DIRECTION_DEFAULT;
#endif

@property (nonatomic,readonly) NSNumber* LIVEPHOTO_PLAYBACK_STYLE_HINT;
@property (nonatomic,readonly) NSNumber* LIVEPHOTO_PLAYBACK_STYLE_FULL;

#ifdef USE_TI_UIIOSATTRIBUTEDSTRING
@property (nonatomic,readonly) NSNumber* ATTRIBUTE_FONT;
@property (nonatomic,readonly) NSNumber* ATTRIBUTE_PARAGRAPH_STYLE;
@property (nonatomic,readonly) NSNumber* ATTRIBUTE_FOREGROUND_COLOR;
@property (nonatomic,readonly) NSNumber* ATTRIBUTE_BACKGROUND_COLOR;
@property (nonatomic,readonly) NSNumber* ATTRIBUTE_LIGATURE;
@property (nonatomic,readonly) NSNumber* ATTRIBUTE_KERN;
@property (nonatomic,readonly) NSNumber* ATTRIBUTE_STRIKETHROUGH_STYLE;
@property (nonatomic,readonly) NSNumber* ATTRIBUTE_UNDERLINES_STYLE;
@property (nonatomic,readonly) NSNumber* ATTRIBUTE_STROKE_COLOR;
@property (nonatomic,readonly) NSNumber* ATTRIBUTE_STROKE_WIDTH;
@property (nonatomic,readonly) NSNumber* ATTRIBUTE_SHADOW;
@property (nonatomic,readonly) NSNumber* ATTRIBUTE_VERTICAL_GLYPH_FORM;
@property (nonatomic,readonly) NSNumber* ATTRIBUTE_WRITING_DIRECTION;
@property (nonatomic,readonly) NSNumber* ATTRIBUTE_TEXT_EFFECT;
@property (nonatomic,readonly) NSNumber* ATTRIBUTE_ATTACHMENT;
@property (nonatomic,readonly) NSNumber* ATTRIBUTE_LINK;
@property (nonatomic,readonly) NSNumber* ATTRIBUTE_BASELINE_OFFSET;
@property (nonatomic,readonly) NSNumber* ATTRIBUTE_UNDERLINE_COLOR;
@property (nonatomic,readonly) NSNumber* ATTRIBUTE_STRIKETHROUGH_COLOR;
@property (nonatomic,readonly) NSNumber* ATTRIBUTE_OBLIQUENESS;
@property (nonatomic,readonly) NSNumber* ATTRIBUTE_EXPANSION;

@property (nonatomic,readonly) NSNumber* ATTRIBUTE_UNDERLINE_STYLE_NONE;
@property (nonatomic,readonly) NSNumber* ATTRIBUTE_UNDERLINE_STYLE_SINGLE;
// iOS 7 ----
@property (nonatomic,readonly) NSNumber* ATTRIBUTE_UNDERLINE_STYLE_THICK;
@property (nonatomic,readonly) NSNumber* ATTRIBUTE_UNDERLINE_STYLE_DOUBLE;
@property (nonatomic,readonly) NSNumber* ATTRIBUTE_UNDERLINE_PATTERN_SOLID;
@property (nonatomic,readonly) NSNumber* ATTRIBUTE_UNDERLINE_PATTERN_DOT;
@property (nonatomic,readonly) NSNumber* ATTRIBUTE_UNDERLINE_PATTERN_DASH;
@property (nonatomic,readonly) NSNumber* ATTRIBUTE_UNDERLINE_PATTERN_DASH_DOT;
@property (nonatomic,readonly) NSNumber* ATTRIBUTE_UNDERLINE_PATTERN_DASH_DOT_DOT;
@property (nonatomic,readonly) NSNumber* ATTRIBUTE_UNDERLINE_BY_WORD;

@property (nonatomic,readonly) NSNumber* ATTRIBUTE_WRITING_DIRECTION_EMBEDDING;
@property (nonatomic,readonly) NSNumber* ATTRIBUTE_WRITING_DIRECTION_OVERRIDE;
@property (nonatomic,readonly) NSNumber* ATTRIBUTE_WRITING_DIRECTION_NATURAL;
@property (nonatomic,readonly) NSNumber* ATTRIBUTE_WRITING_DIRECTION_LEFT_TO_RIGHT;
@property (nonatomic,readonly) NSNumber* ATTRIBUTE_WRITING_DIRECTION_RIGHT_TO_LEFT;

@property (nonatomic,readonly) NSString * ATTRIBUTE_LETTERPRESS_STYLE;
#endif

@property(nonatomic,readwrite,assign)	NSNumber *appBadge;
@property(nonatomic,readwrite,assign)	NSNumber *appSupportsShakeToEdit;

//Modal_Presentation&Transition
@property(nonatomic,readonly) NSNumber *MODAL_PRESENTATION_FULLSCREEN;
@property(nonatomic,readonly) NSNumber *MODAL_PRESENTATION_PAGESHEET;
@property(nonatomic,readonly) NSNumber *MODAL_PRESENTATION_FORMSHEET;
@property(nonatomic,readonly) NSNumber *MODAL_PRESENTATION_CURRENT_CONTEXT;

@property(nonatomic,readonly) NSNumber *MODAL_TRANSITION_STYLE_COVER_VERTICAL;
@property(nonatomic,readonly) NSNumber *MODAL_TRANSITION_STYLE_FLIP_HORIZONTAL;
@property(nonatomic,readonly) NSNumber *MODAL_TRANSITION_STYLE_CROSS_DISSOLVE;

@property(nonatomic,readonly) NSNumber *MODAL_TRANSITION_STYLE_PARTIAL_CURL;

#ifdef USE_TI_UIIOSADVIEW
-(id)createAdView:(id)args;

@property(nonatomic,readonly) NSString* AD_SIZE_PORTRAIT;
@property(nonatomic,readonly) NSString* AD_SIZE_LANDSCAPE;

#endif


/**
    Checks the force touch capibility of the current device.
 */
-(NSNumber*)forceTouchSupported;

#ifdef USE_TI_UIIOS3DMATRIX
-(id)create3DMatrix:(id)args;
#endif
#ifdef USE_TI_UIIOSCOVERFLOWVIEW
-(id)createCoverFlowView:(id)args;
#endif
#ifdef USE_TI_UIIOSTOOLBAR
-(id)createToolbar:(id)args;
#endif
#ifdef USE_TI_UIIOSTABBEDBAR
-(id)createTabbedBar:(id)args;
#endif
#if defined(USE_TI_UIIPADDOCUMENTVIEWER) || defined(USE_TI_UIIOSDOCUMENTVIEWER)
-(id)createDocumentViewer:(id)args;
#endif
#ifdef USE_TI_UIIOSNAVIGATIONWINDOW
-(id)createNavigationWindow:(id)args;
#endif
#ifdef USE_TI_UIIOSSPLITWINDOW
-(id)createSplitWindow:(id)args;
#endif
#ifdef USE_TI_UIIOSATTRIBUTEDSTRING
-(id)createAttributedString:(id)args;
#endif
#ifdef USE_TI_UIIOSANIMATOR
-(id)createAnimator:(id)args;
#ifdef USE_TI_UIIOSSNAPBEHAVIOR
-(id)createSnapBehavior:(id)args;
#endif
#ifdef USE_TI_UIIOSPUSHBEHAVIOR
-(id)createPushBehavior:(id)args;
#endif
#ifdef USE_TI_UIIOSGRAVITYBEHAVIOR
-(id)createGravityBehavior:(id)args;
#endif
#ifdef USE_TI_UIIOSANCHORATTACHMENTBEHAVIOR
-(id)createAnchorAttachmentBehavior:(id)args;
#endif
#ifdef USE_TI_UIIOSVIEWATTACHMENTBEHAVIOR
-(id)createViewAttachmentBehavior:(id)args;
#endif
#ifdef USE_TI_UIIOSCOLLISIONBEHAVIOR
-(id)createCollisionBehavior:(id)args;
#endif
#ifdef USE_TI_UIIOSDYNAMICITEMBEHAVIOR
-(id)createDynamicItemBehavior:(id)args;
#endif
#ifdef USE_TI_UIIOSTRANSITIONANIMATION
-(id)createTransitionAnimation:(id)args;
#endif
#ifdef USE_TI_UIIOSPREVIEWCONTEXT
-(id)createPreviewAction:(id)args;
-(id)createPreviewActionGroup:(id)args;
-(id)createPreviewContext:(id)args;
#endif
#ifdef USE_TI_UIIOSMENUPOPUP
-(id)createMenuPopup:(id)args;
#endif
#endif

#if IS_XCODE_7
#ifdef USE_TI_UIIOSAPPLICATIONSHORTCUTS
-(id)createApplicationShortcuts:(id)args;
#endif
#endif
@end

