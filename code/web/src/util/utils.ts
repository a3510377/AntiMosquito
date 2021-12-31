export function toggleFullScreen(el: HTMLElement) {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen.call(el);
    return true;
  } else {
    document.exitFullscreen.call(document);
    return false;
  }
}
