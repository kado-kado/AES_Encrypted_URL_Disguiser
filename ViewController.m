//
// ViewController.m
// aes-url
//
// Created by Anonym on 20.09.25.
//

#import "ViewController.h"
#import <WebKit/WebKit.h>

@interface ViewController ()
@property (strong, nonatomic) NSString *tabName;
@property (strong, nonatomic) WKWebView *webView;
@end

@implementation ViewController

- (instancetype)initWithTabName:(NSString *)tabName {
    self = [super init];
    if (self) {
        _tabName = tabName;
        self.title = tabName;
    }
    return self;
}

- (void)viewDidLoad {
    [super viewDidLoad];

    self.webView = [[WKWebView alloc] initWithFrame:self.view.bounds];
    self.webView.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
    [self.view addSubview:self.webView];

    NSString *htmlPath = [[NSBundle mainBundle] pathForResource:@"index" ofType:@"html" inDirectory:self.tabName];
    NSURL *url = [NSURL fileURLWithPath:htmlPath];
    [self.webView loadFileURL:url allowingReadAccessToURL:url];
}

@end