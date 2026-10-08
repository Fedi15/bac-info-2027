package com.torbaga.prof

import android.content.ActivityNotFoundException
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.util.Base64
import android.webkit.JavascriptInterface
import android.webkit.WebChromeClient
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.Toast
import android.app.Activity
import androidx.core.content.FileProvider
import java.io.File
import java.io.FileOutputStream

class MainActivity : Activity() {

    private lateinit var webView: WebView

    companion object {
        private const val SITE_URL = "https://etude-bac.torbaga.workers.dev/"
        private const val INSTAGRAM_PACKAGE = "com.instagram.android"
        private const val INSTAGRAM_STORY_ACTION = "com.instagram.share.ADD_TO_STORY"
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        webView = WebView(this)
        setContentView(webView)

        webView.settings.javaScriptEnabled = true
        webView.settings.domStorageEnabled = true
        webView.settings.allowFileAccess = false
        webView.settings.allowContentAccess = false
        webView.webChromeClient = WebChromeClient()
        webView.webViewClient = object : WebViewClient() {}
        webView.addJavascriptInterface(TorbagaNativeBridge(), "TorbagaNative")
        webView.loadUrl(SITE_URL)
    }

    inner class TorbagaNativeBridge {
        @JavascriptInterface
        fun shareToInstagramStory(dataUrl: String) {
            runOnUiThread {
                try {
                    val uri = writeStoryImage(dataUrl)
                    val instagramIntent = Intent(INSTAGRAM_STORY_ACTION).apply {
                        setPackage(INSTAGRAM_PACKAGE)
                        setDataAndType(uri, "image/jpeg")
                        putExtra(Intent.EXTRA_STREAM, uri)
                        putExtra("interactive_asset_uri", uri)
                        putExtra("source_application", packageName)
                        addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
                    }

                    grantUriPermission(
                        INSTAGRAM_PACKAGE,
                        uri,
                        Intent.FLAG_GRANT_READ_URI_PERMISSION
                    )

                    val resolver = packageManager.resolveActivity(instagramIntent, 0)
                    if (resolver == null) {
                        Toast.makeText(
                            this@MainActivity,
                            "Instagram n'est pas installé.",
                            Toast.LENGTH_SHORT
                        ).show()
                        return@runOnUiThread
                    }

                    startActivity(instagramIntent)
                } catch (e: ActivityNotFoundException) {
                    Toast.makeText(
                        this@MainActivity,
                        "Impossible d'ouvrir Instagram Story.",
                        Toast.LENGTH_SHORT
                    ).show()
                } catch (e: Exception) {
                    Toast.makeText(
                        this@MainActivity,
                        "Erreur pendant le partage Instagram.",
                        Toast.LENGTH_SHORT
                    ).show()
                }
            }
        }
    }

    private fun writeStoryImage(dataUrl: String): Uri {
        val comma = dataUrl.indexOf(',')
        require(comma >= 0) { "Invalid data URL" }

        val encoded = dataUrl.substring(comma + 1)
        val bytes = Base64.decode(encoded, Base64.DEFAULT)

        val directory = File(cacheDir, "stories").apply { mkdirs() }
        directory.listFiles()?.forEach { file -> file.delete() }

        val file = File(directory, "torbaga-story.jpg")
        FileOutputStream(file).use { it.write(bytes) }

        return FileProvider.getUriForFile(
            this,
            "com.torbaga.prof.fileprovider",
            file
        )
    }

    override fun onDestroy() {
        webView.removeJavascriptInterface("TorbagaNative")
        webView.destroy()
        super.onDestroy()
    }
}
