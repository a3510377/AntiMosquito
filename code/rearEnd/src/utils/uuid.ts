import { reverse } from "./main";

/** 生成唯一ID
 * @param index 安全碼
 */
export function makeId(index: number) {
  let time = (+new Date()).toString(2).padStart(42, "0"),
    id = (+reverse(index.toString()).substring(1, -1))
      .toString(2)
      .padStart(4, "0");

  return parseInt(time + id, 2);
}

/** 隨機生成 string */
export function randomString(length: number, notIs?: string): string {
  let str = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
    result = "";
  for (let i = length; i > 0; --i)
    result += str[~~(Math.random() * str.length)];
  if (!!notIs && notIs === result) return randomString(length, notIs);
  return result;
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
