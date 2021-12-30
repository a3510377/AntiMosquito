export interface Events {
  Hello: { heartbeat_interval: number };
}

export enum opCode {
  /**
   * @type {Send & Receive}
   * 客戶端發送心跳
   */
  Heartbeat = 1,
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
