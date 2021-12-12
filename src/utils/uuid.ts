import { reverse } from "./main";

/**token 正則 */
export const tokenExp = /([0-9a-zA-Z]{16}.[0-9a-zA-Z]{1,9}.[0-9a-zA-Z]{20})/;
/**元時間 */
export const EPOCH = 1639195200000;

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

/**生成唯一 ID
 * @param index 安全碼
 */
export function makeId(index: number): string {
  let time = (+new Date() - EPOCH).toString(2).padStart(42, "0"),
    id = (+reverse(index.toString()).substring(1, -1))
      .toString(2)
      .padStart(4, "0");

  return parseInt(time + id, 2).toString();
}

/**解析 ID
 * @param id 需解析的 ID
 */
export function getIdData(id: string) {
  let $10 = parseInt(id, 10),
    $2 = idToBinary($10.toString()).padStart(42 + 4, "0");

  return {
    $2,
    $10,
    timestamp: parseInt($2.substring(42, -1), 2) + EPOCH,
    randomId: parseInt($2.substring(42), 2),
    get date() {
      return new Date(this.timestamp);
    },
  };
}

/**生成 token
 * @param id token 用戶 ID
 */
export function makeToken(id: string): string {
  return [
    randomString(16),
    parseInt(id, 10).toString(36),
    randomString(20),
  ].join(".");
}

/**生成 token
 * @param token 需解析 token
 */
export function getTokenData(token: string) {
  if (tokenExp.test(token)) return false;
  let tokenData = token.split(".");
  return {
    id: getIdData(tokenData[1]),
  };
}
