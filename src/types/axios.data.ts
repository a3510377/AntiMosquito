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
