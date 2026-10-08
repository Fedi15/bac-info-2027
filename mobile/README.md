# TORBAGA Prof Informatique — Cross-platform mobile app

This folder is the **single mobile project source** for Android and iOS around the existing Cloudflare website.

## What is included

- Flutter application shell.
- Android native Instagram Story bridge.
- iOS native Instagram Story bridge.
- WebView loading the live site:
  `https://etude-bac.torbaga.workers.dev/`
- The website's 1080×1920 Story is generated first; the mobile bridge receives the JPEG as a data URL.
- Android uses Instagram's `com.instagram.share.ADD_TO_STORY` intent with a FileProvider URI.
- iOS uses `instagram-stories://share` and the Instagram pasteboard background-image key.
- Normal browser use keeps the existing Web Share/download fallback.

## Important build note

The source is prepared for Flutter, but this environment does **not** have the Flutter SDK or Xcode installed, so an Android APK/iOS IPA was not falsely claimed as compiled here.

On a development machine with Flutter installed:

```text
cd mobile
flutter pub get
flutter run
```

For Android, Android Studio/SDK is required. For iOS, macOS + Xcode is required for compilation/signing.

If opening the folder in Android Studio, open the `mobile` folder as a Flutter project after installing the Flutter/Dart plugins.

## Instagram behavior

Inside this mobile wrapper, tapping **Instagram → Story** does not call the generic `navigator.share()` chooser. The generated Story image is passed to the native bridge and the native platform requests Instagram's Story share handler directly.

Instagram still controls its own final Story editor and publishing screen. The app cannot silently publish a Story for the user.

The integration depends on the Instagram app being installed and on the current Instagram platform behavior/API. If Instagram does not expose the handler on a particular device/version, the app reports the failure instead of pretending the share succeeded.
