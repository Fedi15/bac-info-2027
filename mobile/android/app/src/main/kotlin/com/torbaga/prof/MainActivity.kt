package com.torbaga.prof

import android.content.Intent
import android.net.Uri
import androidx.core.content.FileProvider
import io.flutter.embedding.android.FlutterActivity
import io.flutter.embedding.engine.FlutterEngine
import io.flutter.plugin.common.MethodChannel
import java.io.File

class MainActivity : FlutterActivity() {
    companion object {
        private const val CHANNEL = "torbaga/native"
        private const val INSTAGRAM_PACKAGE = "com.instagram.android"
        private const val INSTAGRAM_STORY_ACTION = "com.instagram.share.ADD_TO_STORY"
        private const val META_APP_ID = "2568225346923281"
    }

    override fun configureFlutterEngine(flutterEngine: FlutterEngine) {
        super.configureFlutterEngine(flutterEngine)
        MethodChannel(flutterEngine.dartExecutor.binaryMessenger, CHANNEL).setMethodCallHandler { call, result ->
            when (call.method) {
                "shareInstagramStory" -> {
                    val path = call.argument<String>("path")
                    if (path.isNullOrBlank()) {
                        result.success(false)
                    } else {
                        result.success(shareInstagramStory(File(path)))
                    }
                }
                else -> result.notImplemented()
            }
        }
    }

    private fun shareInstagramStory(file: File): Boolean {
        if (!file.exists() || file.length() == 0L) return false
        if (packageManager.getLaunchIntentForPackage(INSTAGRAM_PACKAGE) == null) return false

        return try {
            val uri = FileProvider.getUriForFile(this, "com.torbaga.prof.fileprovider", file)

            // Instagram's Story background-asset flow expects the image URI as
            // the Intent data/type. The interactive_asset_uri extra is for a
            // sticker layer, not for the full Story background.
            val intent = Intent(INSTAGRAM_STORY_ACTION).apply {
                setPackage(INSTAGRAM_PACKAGE)
                setDataAndType(uri, "image/jpeg")
                putExtra("source_application", META_APP_ID)
                addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
            }

            grantUriPermission(INSTAGRAM_PACKAGE, uri, Intent.FLAG_GRANT_READ_URI_PERMISSION)

            if (packageManager.resolveActivity(intent, 0) == null) return false
            startActivity(intent)
            true
        } catch (_: Exception) {
            false
        }
    }
}
