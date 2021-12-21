export class mapProgress {
  protected loading: number = 0;
  protected loaded: number = 0;
  constructor(public el: HTMLElement) {}
  addLoading() {
    if (this.loading === 0) this.show();
    ++this.loading;
    this.update();
  }
  addLoaded() {
    setTimeout(() => {
      ++this.loaded;
      this.update();
    }, 100);
  }
  update() {
    const width = ((this.loaded / this.loading) * 100).toFixed(1) + "%";
    this.el.style.width = width;
    if (this.loading === this.loaded) {
      this.loading = 0;
      this.loaded = 0;
      setTimeout(() => {
        this.hide();
      }, 500);
    }
  }
  show() {
    this.el.style.visibility = "visible";
  }
  hide() {
    if (this.loading === this.loaded) {
      this.el.style.visibility = "hidden";
      this.el.style.width = "0px";
    }
  }
}
