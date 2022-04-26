export class baseControl {
  constructor(
    private options: {
      text?: string;
      title?: string;
      target?: HTMLElement;
      show?: boolean;
    } = {},
    private clickEvent?: (
      this: HTMLButtonElement,
      ev: MouseEvent,
      el: HTMLButtonElement
    ) => any
  ) {
    if (this.options.show === void 0) this.options.show = true;
  }
  makeButton() {
    const button = document.createElement("button");
    if (!this.options.show) button.style.display = "none";
    button.innerHTML = this.options.text || "";
    button.title = this.options.title || "";
    button.type = "button";
    button.addEventListener(
      "click",
      (ev) => {
        this.clickEvent?.bind(button, ev, button)();
      },
      false
    );
    return button;
  }
}
export class baseControlDiv {
  constructor(
    options: {
      target?: HTMLElement;
      control?: Array<baseControl>;
      classList?: string[];
    } = {}
  ) {
    const div = document.createElement("div");
    options.classList && div.classList.add(...options.classList);
    options.control
      ?.map((value) => value?.makeButton())
      .forEach((value) => div.append(value));
    options.target
      ?.querySelector(".ol-zoom.ol-unselectable.ol-control")
      ?.append(div);
  }
}
