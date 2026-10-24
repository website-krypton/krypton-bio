"use strict";
// Optional preview variations: ?theme=violet or ?theme=cyan.
const theme = new URLSearchParams(location.search).get("theme");
if (["aurora", "violet", "cyan"].includes(theme)) document.documentElement.dataset.theme = theme;
const shareButton = document.querySelector(".share");
const status = document.querySelector(".toast");
let toastTimer;
function announce(message) {
  status.textContent = message;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { status.textContent = ""; }, 4500);
}
if (location.protocol === "https:" || location.hostname === "localhost" || location.hostname === "127.0.0.1") {
  shareButton.hidden = false;
  shareButton.addEventListener("click", async () => {
    const url = new URL(location.href); url.search = ""; url.hash = "";
    try {
      if (navigator.share) await navigator.share({title: "KryptonAEP", text: "Every frame, a feeling.", url: url.href});
      else if (navigator.clipboard) { await navigator.clipboard.writeText(url.href); announce("Link copied. Share the universe."); }
      else announce("Copy this page’s address to share it.");
    } catch (error) {
      if (error.name !== "AbortError") announce("Copy this page’s address to share it.");
    }
  });
}
