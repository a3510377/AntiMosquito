/**反轉文字
 * @param str 需反轉的文字
 */
export function reverse(str: string): string {
  return str.split("").reverse().join("");
}

export class mainData {
  protected _makeIdIndex: number = 0;
  constructor() {}
  get makeIdIndex() {
    return (this._makeIdIndex =
      ++this._makeIdIndex > 10 ? 0 : this._makeIdIndex);
  }
}
