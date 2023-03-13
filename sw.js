const CACHE_NAME = "v1_cache_Francisco";

// CACHEAMOS RECURSOS
// PUEDEN ESTAR EN OTROS SERVIDORES
urlsToCache = [
  "./",
  "./style.cs",
  "./img/ProgramadorFitness.png",
  "./img/favicon.png",
];

/* *****
DURANTE LA FASE DE INSTALACIÓN, GENERALMENTE SE ALMACENA EN CACHÉ LOS
ACTIVOS ESTÁTICOS
***** */
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache).then(() => self.skipWaiting());
      })
      .catch((err) => console.log("Falló registro caché", err))
  );
});

/* *****
UNA VEZ QUE SE INSTALA EL SW, SE ACTIVA Y BUSCA LOS RECURSOS
PARA HACER QUE FUNCIONEN SIN CONEXIÓN
***** */
self.addEventListener("activate", (e) => {
  const cacheWhitelist = [CACHE_NAME];

  e.waitUntil(
    caches
      .keys()
      .then((cachesNames) => {
        cachesNames.map((cachesName) => {
          // ELIMINAMOS LO QUE NO SE NECESITA EN CACHÉ
          if (cacheWhitelist.indexOf(cacheName === -1)) {
            return caches.delete(cacheName);
          }
        });
      })
      // LE INDICA AL SW ACTIVAR EL CACHÉ ACTUAL
      .then(() => self.clients.claim())
  );
});

/* *****
CUANDO EL NAVEGADOR RECUPERA UNA URL
***** */
self.addEventListener("fetch", (e) => {
  // RESPONDER YA SEA CON EL OBJETO EN CACHÉ O CONTINUAR Y
  // BUSCAR LA URL REAL
  e.respondWith(
    caches.match(e.request).then((res) => {
      if (res) {
        // RECUPERAR DEL CACHÉ
        return res;
      }
      // RECUPERAR LA PETICIÓN A LA URL
      return fetch(e.request);
    })
  );
});
