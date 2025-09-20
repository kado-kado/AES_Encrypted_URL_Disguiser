//
// TabBarController.m
// aes-url
//
// Created by Anonym on 20.09.25.
//

#import "TabBarController.h"
#import "ViewController.h"

@implementation TabBarController

- (instancetype)init {
    self = [super init];
    if (self) {
        NSArray *tabs = @[@"Home", @"Encrypt", @"Decrypt", @"Other"];
        NSMutableArray *viewControllers = [NSMutableArray array];

        for (NSString *tab in tabs) {
            ViewController *vc = [[ViewController alloc] initWithTabName:tab];
            UINavigationController *nav = [[UINavigationController alloc] initWithRootViewController:vc];

            UIImage *icon = [UIImage imageNamed:[NSString stringWithFormat:@"%@.png", tab]];
            nav.tabBarItem = [[UITabBarItem alloc] initWithTitle:tab image:icon tag:0];

            [viewControllers addObject:nav];
        }

        self.viewControllers = viewControllers;
    }
    return self;
}

@end