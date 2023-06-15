const cacheName = 'files';

addEventListener('fetch', fetchEvent => {
    const request = fetchEvent.request;
    if (request.method !== 'GET'/*  || request.url.includes('zqccloud') */ || request.url.includes('drinkToken')) {
        return;
    }
    fetchEvent.respondWith(async function () {
        const responseFromFetch = fetch(request);
        fetchEvent.waitUntil(async function () {
            const responseCopy = (await responseFromFetch).clone();
            const myCache = await caches.open(cacheName);
            await myCache.put(request, responseCopy);
        }());
        const responseFromCache = await caches.match(request);
        return responseFromCache || responseFromFetch;
    }());
});