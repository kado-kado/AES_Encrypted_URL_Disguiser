//
// AppDelegate.m
// aes-url
//
// Created by Anonym on 20.09.25.
//

#import "AppDelegate.h"
#import "TabBarController.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    self.window = [[UIWindow alloc] initWithFrame:[[UIScreen mainScreen] bounds]];
    TabBarController *tabBarController = [[TabBarController alloc] init];
    self.window.rootViewController = tabBarController;
    [self.window makeKeyAndVisible];
    return YES;
}

@end