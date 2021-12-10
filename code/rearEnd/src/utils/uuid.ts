import { reverse } from "./main";

/**10進制轉2進制
 * @param num 要轉化的數
 */
export function idToBinary(num: string): string {
  num = num.toString();
  let bin = "",
    high = parseInt(num.slice(0, -10)) || 0,
    low = parseInt(num.slice(-10));
  while (low > 0 || high > 0) {
    bin = String(low & 1) + bin;
    low = Math.floor(low / 2);
    if (high > 0) {
      low += 5e9 * (high % 2);
      high = Math.floor(high / 2);
    }
  }
  return bin;
}

/**生成唯一ID
 * @param index 安全碼
 */
export function makeId(index: number) {
  let time = (+new Date()).toString(2).padStart(42, "0"),
    id = (+reverse(index.toString()).substring(1, -1))
      .toString(2)
      .padStart(4, "0");

  return parseInt(time + id, 2);
}

/**隨機生成文字
 * @param length 生成指定長度的文字
 * @param notIs  是否確認相同
 */
export function randomString(length: number, notIs?: string): string {
  let str = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
    result = "";
  for (let i = length; i > 0; --i)
    result += str[~~(Math.random() * str.length)];
  if (!!notIs && notIs === result) return randomString(length, notIs);
  return result;
}

/**解析ID
 * @param id 需解析的ID
 */
export function idData(id: string) {
  let $10 = parseInt(id, 10),
    $2 = idToBinary($10.toString()).padStart(42 + 4, "0");

  return {
    timestamp: parseInt($2.substring(42, -1), 2),
    randomId: parseInt($2.substring(42), 2),
    binary: $2,
    get date() {
      return new Date(this.timestamp);
    },
  };
}

// /**
//  * token
//  * id
//  * id -> {
//  *  42 to 4: time,
//  *  1 to 4: 隨機數
//  * }
//  */
// let $10 = makeId(99);
// let $2 = $10.toString(2).padStart(42 + 4, "0");
// let time = $2.substring(42, -1);

// console.log($2);
// console.log($2.substring(42), "\n");
// console.log(time);
// console.log($10);
// // 1234567
// console.log($10 >> 4);
