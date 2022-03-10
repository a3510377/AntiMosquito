/*----- ws -----*/
/**wsEvent */
export interface wsEvents {
  Hello: { heartbeat_interval: number };
}
/**op codes */
export enum wsOpCode {
  /**
   * @type {Receive}
   * 客戶端讀取伺服器發送的事件
   */
  Event = 0,
  /**
   * @type {Send | Receive}
   * 客戶端發送心跳
   */
  Heartbeat,
  /**
   * @type {Send}
   * 客戶端發送認證請求
   */
  Identify,
  /**
   * @type {Receive}
   * 伺服器初始化完畢發送
   */
  Hello = 10,
  /**
   * @type {Receive}
   * 伺服器發送確認心跳
   */
  HeartbeatACK,
}
