(async () => {
  try {
    if (navigator.serviceWorker) {
      await navigator.serviceWorker.register(
        '/service-worker.js',
      );
    }
  } catch (e) {
    console.log(e);
  }
})();