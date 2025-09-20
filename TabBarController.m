//
// TabBarController.m
// aes-url
//
// Created by Anonym on 20.09.25.
//

#import "TabBarController.h"
#import "ViewController.h"
#import <UIKit/UIKit.h>

@implementation TabBarController

- (instancetype)init {
    self = [super init];
    if (self) {
        NSArray *tabs = @[@"Home", @"Encrypt", @"Decrypt", @"Other"];
        NSMutableArray *viewControllers = [NSMutableArray array];

        for (NSString *tab in tabs) {
            // 各タブ用の ViewController を生成
            ViewController *vc = [[ViewController alloc] initWithTabName:tab];
            UINavigationController *nav = [[UINavigationController alloc] initWithRootViewController:vc];

            // アイコン画像を読み込む
            UIImage *icon = [UIImage imageNamed:[NSString stringWithFormat:@"%@.png", tab]];
            
            // アイコンのサイズを固定（例: 30x30pt）
            UIImageView *iconView = [[UIImageView alloc] initWithImage:icon];
            iconView.frame = CGRectMake(0, 0, 30, 30);

            UIGraphicsBeginImageContextWithOptions(iconView.bounds.size, NO, 0.0);
            [iconView.layer renderInContext:UIGraphicsGetCurrentContext()];
            UIImage *fixedSizeIcon = UIGraphicsGetImageFromCurrentImageContext();
            UIGraphicsEndImageContext();

            // タブバーアイテムを作成
            nav.tabBarItem = [[UITabBarItem alloc] initWithTitle:tab
                                                           image:[fixedSizeIcon imageWithRenderingMode:UIImageRenderingModeAlwaysOriginal]
                                                             tag:0];

            [viewControllers addObject:nav];
        }

        self.viewControllers = viewControllers;
    }
    return self;
}

@end