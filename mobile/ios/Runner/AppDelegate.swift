import UIKit
import Flutter

@main
@objc class AppDelegate: FlutterAppDelegate {
    private let channelName = "torbaga/native"
    private let metaAppID = "2568225346923281"

    override func application(
        _ application: UIApplication,
        didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
    ) -> Bool {
        GeneratedPluginRegistrant.register(with: self)

        guard let controller = window?.rootViewController as? FlutterViewController else {
            return super.application(application, didFinishLaunchingWithOptions: launchOptions)
        }

        let channel = FlutterMethodChannel(
            name: channelName,
            binaryMessenger: controller.binaryMessenger
        )

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

        return super.application(application, didFinishLaunchingWithOptions: launchOptions)
    }

    private func shareInstagramStory(path: String) -> Bool {
        let imageURL = URL(fileURLWithPath: path)
        guard let imageData = try? Data(contentsOf: imageURL),
              UIImage(data: imageData) != nil else {
            return false
        }

        guard let url = URL(string: "instagram-stories://share?source_application=\(metaAppID)"),
              UIApplication.shared.canOpenURL(url) else {
            return false
        }

        let pasteboardItem: [String: Any] = [
            "com.instagram.sharedSticker.backgroundImage": imageData
        ]

        UIPasteboard.general.setItems(
            [pasteboardItem],
            options: [.expirationDate: Date().addingTimeInterval(300)]
        )

        UIApplication.shared.open(url, options: [:], completionHandler: nil)
        return true
    }
}
