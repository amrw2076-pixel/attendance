// عامل خدمة بسيط: بيخلي الموقع يتثبت كتطبيق ويفتح أسرع، ومابيخزنش بيانات Firebase أبداً
var C="mf-v1";
self.addEventListener("install",function(e){self.skipWaiting()});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==C}).map(function(x){return caches.delete(x)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener("fetch",function(e){
  var r=e.request,u=new URL(r.url);
  if(r.method!=="GET"||u.origin!==location.origin)return;
  e.respondWith(fetch(r).then(function(res){var cp=res.clone();caches.open(C).then(function(c){c.put(r,cp)});return res}).catch(function(){return caches.match(r)}))});
self.addEventListener("notificationclick",function(e){e.notification.close();
  e.waitUntil(self.clients.matchAll({type:"window"}).then(function(l){return l.length?l[0].focus():self.clients.openWindow("./")}))});
