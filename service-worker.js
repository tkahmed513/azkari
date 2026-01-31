const CACHE_NAME = "azkari-app-v1";
const ASSETS_TO_CACHE = [
  "./",
  "./index.html",
  "./icon-192.png",
  "./icon-512.png",
  "https://fonts.googleapis.com/css2?family=Amiri+Quran:wght@400&family=Cairo:wght@400;600;700&family=Scheherazade+New:wght@400;700&display=swap"
];

// 1. تثبيت التطبيق وحفظ الملفات (بما فيها الخطوط)
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("تم حفظ ملفات التطبيق للعمل بدون إنترنت");
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 2. تفعيل التطبيق وتنظيف الكاش القديم (مهم جداً للتحديثات)
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
});

// 3. تشغيل وضع الأوفلاين (لو مفيش نت هات من الكاش)
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});