const version='v1';
const cacheName=`ahj-${version}`;
constfiles= 
['/',
'/css/style.css',
'/js/app.js',
];

async function putFilesToCache(files) {
  const cache = await caches.open(cacheName);
  await cache.addAll(files);
}
async function removeOldCache(retain) {
  const keys = await caches.keys();
  return Promise.all(keys.filter(key=>!retain.includes(key)).map(key=>caches.delete(key)));
}



self.addEventListener('install', (evt) => {
  console.log('www');
  evt.waitUntil((async() => {
    await putFilesToCache(files);
    await self.skipWaiting();
  })());
});
self.addEventListener('activate',(evt)=> {

  evt.waitUntil((async() => {
    await removeOldCache([cacheName])
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', (evt) => {
  evt.respondWith((async() => {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(evt.request);
    if (cachedResponse) {
      return cachedResponse;
    }
    return fetch(evt.request);
  })());
});