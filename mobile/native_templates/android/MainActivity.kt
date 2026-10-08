package com.torbaga.prof

import android.content.Intent
import android.net.Uri
import androidx.core.content.FileProvider
import io.flutter.embedding.android.FlutterActivity
import io.flutter.embedding.engine.FlutterEngine
import io.flutter.plugin.common.MethodChannel
import java.io.File

class MainActivity : FlutterActivity() {
    private val channel = "torbaga/native"

    override fun configureFlutterEngine(flutterEngine: FlutterEngine) {
        super.configureFlutterEngine(flutterEngine)
        MethodChannel(flutterEngine.dartExecutor.binaryMessenger, channel).setMethodCallHandler { call, result ->
            when (call.method) {
                "shareInstagramStory" -> {
                    val path = call.argument<String>("path")
                    result.success(if (path.isNullOrBlank()) false else shareInstagramStory(File(path)))
                }
                else -> result.notImplemented()
            }
        }
    }

    private fun shareInstagramStory(file: File): Boolean {
        val packageName = "com.instagram.android"
        if (!file.exists() || packageManager.getLaunchIntentForPackage(packageName) == null) return false

        return try {
            val uri: Uri = FileProvider.getUriForFile(this, "com.torbaga.prof.fileprovider", file)
            val intent = Intent("com.instagram.share.ADD_TO_STORY").apply {
                setPackage(packageName)
                putExtra("interactive_asset_uri", uri)
                addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
                addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            }
            grantUriPermission(packageName, uri, Intent.FLAG_GRANT_READ_URI_PERMISSION)
            startActivity(intent)
            true
        } catch (_: Exception) {
            false
        }
    }
}
