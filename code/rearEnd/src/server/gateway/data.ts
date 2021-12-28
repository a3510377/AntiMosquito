export interface Events {
  Hello: { heartbeat_interval: number };
}

export const opCode = {
  /**
   * @type {Send & Receive}
   */
  Heartbeat: 1,
  /**
   * @type {Send}
   */
  Identify: 2,
  /**
   * @type {Send}
   */
  Resume: 6,
  /**
   * @type {Send}
   */
  Reconnect: 7,
  /**
   * @type {Receive}
   */
  Hello: 10,
  /**
   * @type {Receive}
   */
  HeartbeatACK: 11,
};
