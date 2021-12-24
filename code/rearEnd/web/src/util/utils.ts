export function toggleFullScreen(el: HTMLElement) {
  if (!document.fullscreenElement)
    document.documentElement.requestFullscreen.call(el);
  else document.exitFullscreen.call(document);
}
