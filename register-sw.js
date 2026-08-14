if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./sw.js")
      .then(() => {
        console.log("ULTRON service worker registered.");
      })
      .catch((error) => {
        console.error(
          "ULTRON service worker registration failed:",
          error
        );
      });
  });
}
