# v15 build/check status

This archive was assembled and statically checked in this environment.

Verified:
- Cloudflare project files are present.
- `public/js.js` contains the native Instagram branch before `navigator.share()`.
- Flutter JavaScript channel is named `TorbagaNative`.
- Flutter method channel is `torbaga/native`.
- Android method name is `shareInstagramStory`.
- Android package is `com.torbaga.prof`.
- Android Instagram target is `com.instagram.android`.
- Android Story action is `com.instagram.share.ADD_TO_STORY`.
- Meta App ID is `2568225346923281` in Android and iOS native code.
- Android FileProvider authority matches the manifest and Kotlin code.
- Android Story image is passed as Intent data with MIME type `image/jpeg`.
- iOS pasteboard key is `com.instagram.sharedSticker.backgroundImage`.
- iOS URL is `instagram-stories://share?source_application=2568225346923281`.
- iOS declares `instagram-stories` under `LSApplicationQueriesSchemes`.

Not possible in this environment:
- Running `flutter pub get` because Flutter/Dart SDK is not installed here.
- Compiling an Android APK because Android SDK/Gradle toolchain is not installed here.
- Compiling/signing an iOS app because Xcode/macOS is not available here.

Therefore this archive is source-complete for the bridge, but no APK/IPA is represented as precompiled.
