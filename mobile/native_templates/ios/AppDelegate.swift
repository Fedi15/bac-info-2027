import UIKit
import Flutter

@main
@objc class AppDelegate: FlutterAppDelegate {
    private let channelName = "torbaga/native"

    override func application(
        _ application: UIApplication,
        didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
    ) -> Bool {
        let controller = window?.rootViewController as! FlutterViewController
        let channel = FlutterMethodChannel(name: channelName, binaryMessenger: controller.binaryMessenger)

        channel.setMethodCallHandler { [weak self] call, result in
            guard call.method == "shareInstagramStory" else {
                result(FlutterMethodNotImplemented)
                return
            }
            guard let args = call.arguments as? [String: Any],
                  let path = args["path"] as? String else {
                result(false)
                return
            }
            result(self?.shareInstagramStory(path: path) ?? false)
        }

        GeneratedPluginRegistrant.register(with: self)
        return super.application(application, didFinishLaunchingWithOptions: launchOptions)
    }

    private func shareInstagramStory(path: String) -> Bool {
        guard let imageData = try? Data(contentsOf: URL(fileURLWithPath: path)),
              UIImage(data: imageData) != nil else { return false }

        let pasteboardItem: [String: Any] = [
            "com.instagram.sharedSticker.backgroundImage": imageData
        ]
        UIPasteboard.general.setItems(
            [pasteboardItem],
            options: [.expirationDate: Date().addingTimeInterval(300)]
        )

        guard let url = URL(string: "instagram-stories://share"),
              UIApplication.shared.canOpenURL(url) else { return false }

        UIApplication.shared.open(url, options: [:], completionHandler: nil)
        return true
    }
}
