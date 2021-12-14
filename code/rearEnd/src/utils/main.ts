/**反轉文字
 * @param str 需反轉的文字
 */
export function reverse(str: string): string {
  return str.split("").reverse().join("");
}

export function random(
  max: number,
  min: number = 1,
  floor: boolean = true
): number {
  if (floor) return Math.floor(Math.random() * max) + min;
  return Math.random() * max + min;
}
