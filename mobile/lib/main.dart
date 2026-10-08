import 'dart:convert';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:path_provider/path_provider.dart';
import 'package:webview_flutter/webview_flutter.dart';

const siteUrl = 'https://etude-bac.torbaga.workers.dev/';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const TorbagaApp());
}

class TorbagaApp extends StatelessWidget {
  const TorbagaApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      debugShowCheckedModeBanner: false,
      home: TorbagaWebView(),
    );
  }
}

class TorbagaWebView extends StatefulWidget {
  const TorbagaWebView({super.key});

  @override
  State<TorbagaWebView> createState() => _TorbagaWebViewState();
}

class _TorbagaWebViewState extends State<TorbagaWebView> {
  late final WebViewController controller;
  bool loading = true;

  @override
  void initState() {
    super.initState();
    controller = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..setBackgroundColor(const Color(0xFFF3E8D0))
      ..addJavaScriptChannel(
        'TorbagaNative',
        onMessageReceived: (message) => _handleNativeMessage(message.message),
      )
      ..setNavigationDelegate(
        NavigationDelegate(
          onPageStarted: (_) => setState(() => loading = true),
          onPageFinished: (_) => setState(() => loading = false),
          onWebResourceError: (_) => setState(() => loading = false),
        ),
      )
      ..loadRequest(Uri.parse(siteUrl));
  }

  static const _native = MethodChannel('torbaga/native');

  Future<void> _handleNativeMessage(String raw) async {
    try {
      final message = jsonDecode(raw);
      if (message is! Map || message['type'] != 'instagram_story') return;

      final dataUrl = message['data'] as String?;
      if (dataUrl == null || !dataUrl.startsWith('data:image/')) return;

      final comma = dataUrl.indexOf(',');
      if (comma < 0) return;
      final bytes = base64Decode(dataUrl.substring(comma + 1));

      final cache = await getTemporaryDirectory();
      final stories = Directory('${cache.path}/stories');
      await stories.create(recursive: true);
      final file = File('${stories.path}/torbaga-story.jpg');
      await file.writeAsBytes(bytes, flush: true);

      final ok = await _native.invokeMethod<bool>('shareInstagramStory', {
        'path': file.path,
      }) ?? false;

      await _notifyWeb(ok ? 'success' : 'unavailable');
    } catch (error) {
      debugPrint('Instagram Story bridge error: $error');
      await _notifyWeb('error');
    }
  }

  Future<void> _notifyWeb(String status) async {
    final safe = jsonEncode(status);
    await controller.runJavaScript(
      "window.TorbagaNativeResult && window.TorbagaNativeResult($safe)",
    );
  }

  Future<bool> _handleBack() async {
    if (await controller.canGoBack()) {
      await controller.goBack();
      return false;
    }
    return true;
  }

  @override
  Widget build(BuildContext context) {
    return PopScope(
      canPop: false,
      onPopInvokedWithResult: (_, __) async {
        if (await _handleBack() && mounted) Navigator.of(context).pop();
      },
      child: Scaffold(
        backgroundColor: const Color(0xFFF3E8D0),
        body: SafeArea(
          child: Stack(
            children: [
              WebViewWidget(controller: controller),
              if (loading)
                const LinearProgressIndicator(minHeight: 2),
            ],
          ),
        ),
      ),
    );
  }
}
