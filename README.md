# TORBAGA Prof Informatique — Cloudflare + Cross-platform Mobile v14

This package contains the existing Cloudflare/D1 website plus a single Flutter mobile source project for Android and iOS.

## Website

The web project is preserved from the working v13 project. It contains:

- `public/` — website files
- `api/` — Cloudflare API functions
- `migrations/` — D1 migrations
- `src/worker.js` — Cloudflare Worker
- `wrangler.toml` — Cloudflare configuration

The mobile-only Instagram Story path has been added without removing the browser fallback.

## Mobile

`mobile/` contains the cross-platform app source. It loads:

`https://etude-bac.torbaga.workers.dev/`

The site sends the generated Story image to the mobile bridge. Android and iOS then use platform-native Instagram Story handoff instead of the generic browser share chooser.

### Build requirement

Flutter SDK is required to run/build the mobile project. Android builds require Android Studio/SDK. iOS builds require macOS + Xcode.

This Linux build environment does not contain Flutter or Xcode, so no fake APK/IPA is included. The source is packaged and syntax-checked where possible.
