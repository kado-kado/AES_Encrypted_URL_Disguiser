//
// ViewController.m
// aes-url
//
// Created by Anonym on 20.09.25.
//

//

#import "ViewController.h"

@interface ViewController () <WKUIDelegate>

@property (strong, nonatomic) WKWebView *webView;
@property (strong, nonatomic) NSString *tabName;

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

    self.view.backgroundColor = [UIColor whiteColor];

    WKWebViewConfiguration *config = [[WKWebViewConfiguration alloc] init];
    self.webView = [[WKWebView alloc] initWithFrame:self.view.bounds configuration:config];
    self.webView.UIDelegate = self;
    self.webView.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
    [self.view addSubview:self.webView];

    NSURL *url = [[NSBundle mainBundle] URLForResource:@"index"
                                         withExtension:@"html"
                                          subdirectory:self.tabName];
    if (url) {
        [self.webView loadFileURL:url allowingReadAccessToURL:url];
    } else {
        NSLog(@"Error: %@/index.html not found", self.tabName);
    }
}

#pragma mark - WKUIDelegate (JS alert対応)

- (void)webView:(WKWebView *)webView
runJavaScriptAlertPanelWithMessage:(NSString *)message
 initiatedByFrame:(WKFrameInfo *)frame
completionHandler:(void (^)(void))completionHandler {

    UIAlertController *alert = [UIAlertController alertControllerWithTitle:@"Alert"
                                                                   message:message
                                                            preferredStyle:UIAlertControllerStyleAlert];

    [alert addAction:[UIAlertAction actionWithTitle:@"OK"
                                              style:UIAlertActionStyleDefault
                                            handler:^(UIAlertAction * _Nonnull action) {
        completionHandler();
    }]];

    [self presentViewController:alert animated:YES completion:nil];
}

@end