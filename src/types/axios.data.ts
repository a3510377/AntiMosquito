/**位置 API 回傳資料 */
export interface GeolocationAPIData {
  /**IP */
  ip: string;
  /**ipv 模式 */
  type: string;
  /**緯度 */
  latitude: float;
  /**經度 */
  longitude: float;
  /**國家簡寫 */
  country_code: string;
  /**國家名 */
  country_name: string;
  /**首都 */
  city: string;
  /**錯誤訊息 */
  error: unknown;
  [key: string]: unknown;
}

export interface villageAPIData {
  /**縣市名 (ex: 台南市) */
  ctyName: string;
  /**區名 (ex: 七股區)*/
  townName: string;
  /**里 (ex: 義合里) */
  villageName: string;
  /**錯誤訊息 */
  error: unknown;
}
