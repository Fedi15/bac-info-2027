# TORBAGA Mobile Share Bridge

This folder adds the native Android bridge required for direct Instagram Story handoff.

## What changed

The web page keeps the existing v13 Story renderer. When it runs inside the Android app, the Instagram button calls `TorbagaNative.shareToInstagramStory(dataUrl)` instead of `navigator.share()`.

The Android app then:

1. Receives the generated 1080×1920 JPEG as a base64 data URL.
2. Stores it in the app cache.
3. Exposes it through AndroidX `FileProvider`.
4. Sends `com.instagram.share.ADD_TO_STORY` directly to the Instagram package (`com.instagram.android`).
5. Passes the image URI and read permission to Instagram.

There is intentionally **no Android chooser** in this path.

## Build

Open `mobile/android` in Android Studio and let Gradle sync. Build/install the `debug` APK on an Android phone that has Instagram installed.

The app loads the live Cloudflare site:

`https://etude-bac.torbaga.workers.dev/`

## Important

The browser website still works normally. Outside the native Android wrapper, the code falls back to the existing Web Share behavior.

Instagram controls the final Story editor. The native integration can open Instagram's Story share handler directly, but it cannot automatically publish the Story or bypass Instagram's own editing/publishing UI.

The iOS equivalent requires a native iOS target using `instagram-stories://share` and pasteboard APIs; this Android implementation does not claim iOS support yet.
