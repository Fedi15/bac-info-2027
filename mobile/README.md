# Torbaga Prof — Cross-platform mobile wrapper

This folder wraps the live Cloudflare site in Flutter and adds a native Instagram Stories bridge.

Meta App ID configured in the native bridge:

`2568225346923281`

## Instagram flow

Inside the mobile wrapper, tapping Instagram does **not** call the browser `navigator.share()` API.
The website sends the generated Story JPEG through the `TorbagaNative` WebView JavaScript channel.
Flutter writes it to a temporary file and invokes the native `torbaga/native` method channel.

### Android

The Android bridge:

- verifies Instagram is installed
- exposes the JPEG through AndroidX `FileProvider`
- uses `com.instagram.share.ADD_TO_STORY`
- sets the image URI as the Intent data with `image/jpeg`
- sets `source_application=2568225346923281`
- explicitly targets `com.instagram.android`
- grants Instagram temporary read access

This is the important difference from the previous version: `interactive_asset_uri` is not used for the full background image. It is a sticker-layer parameter; the full Story background is supplied as the Intent's data URI.

### iOS

The iOS bridge:

- writes the JPEG data to `UIPasteboard`
- uses `com.instagram.sharedSticker.backgroundImage`
- opens `instagram-stories://share?source_application=2568225346923281`
- keeps the pasteboard entry for five minutes

## Build

You need Flutter installed locally. The environment used to prepare this archive does not contain Flutter, Android SDK, or Xcode, so an APK/IPA was not falsely claimed as compiled here.

### Android on Windows

From this `mobile` folder:

```powershell
flutter pub get
flutter build apk --release
```

Install the generated APK on a physical Android phone with Instagram installed.

### iOS

On macOS with Xcode:

```bash
flutter pub get
cd ios
pod install
cd ..
flutter build ios --release
```

Instagram Story sharing must be tested on a physical iPhone; the iOS simulator cannot launch the Instagram app.

## Browser fallback

If the site is opened directly in Chrome/Safari instead of this native wrapper, there is no native bridge. Instagram therefore falls back to the normal browser sharing path. A normal web page cannot force Instagram's Story composer.
