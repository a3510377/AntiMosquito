export class baseControl {
  constructor(
    private options: {
      text?: string;
      title?: string;
      target?: HTMLElement;
    } = {},
    private clickEvent?: Function
  ) {}
  // makeButton(
  //   options: {
  //     text?: string;
  //     title?: string;
  //     target?: HTMLElement;
  //     inDiv?: boolean;
  //   } = {},
  //   clickEvent?: Function
  // ) {
  //   this.clickEvent = clickEvent || this.clickEvent;
  //   this.options = options || this.options;

  //   if (options.inDiv) this.options.target?.append(button);
  //   else
  //     this.options.target
  //       ?.querySelector(".ol-zoom.ol-unselectable.ol-control")
  //       ?.append(button);

  //   return this.options.target;
  // }
  makeButton(): HTMLButtonElement {
    const button = document.createElement("button");
    button.innerHTML = this.options.text || "";
    button.title = this.options.title || "";
    button.type = "button";
    button.addEventListener("click", this.clickEvent?.bind(this), false);
    return button;
  }
}
export class baseControlDiv {
  constructor(options: { target?: HTMLElement; control?: baseControl[] } = {}) {
    const div = document.createElement("div");
    div.append(...(options.control?.map((value) => value.makeButton()) || []));
    options.target
      ?.querySelector(".ol-zoom.ol-unselectable.ol-control")
      ?.append(div);
  }
}
