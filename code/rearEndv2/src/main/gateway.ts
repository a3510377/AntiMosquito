import { EventEmitter } from "events";
import WebSocket from "ws";

import { random } from "../utils/number";
import { server } from "./server";

export namespace wsFunc {
  /**將訊息改為 json or string */
  export function msgToJson(msg: WebSocket.RawData): string | Object {
    let data = msg.toString();
    try {
      data = JSON.parse(data);
    } catch {}
    return data;
  }
  /**回復心跳 */
  export function HeartbeatACK(this: wsClient) {
    this.send({ op: opCode.HeartbeatACK });
  }
  /**初始化完畢發送 */
  export function Hello(this: wsClient) {
    this.send({
      op: opCode.Hello,
      heartbeat_interval: ~~(1e3 * 30 * random(1, 0.8, false)),
    });
  }
  /**wsClient 初始化 */
  export function clientInit(this: wsClient) {
    this.on("message", async (msg) => {
      msg = wsFunc.msgToJson(msg);
      switch (msg.op) {
        case opCode.Heartbeat:
          wsFunc.HeartbeatACK.call(this);
          break;
      }
    });
    wsFunc.Hello.call(this);
  }
  /**發送訊息至 wsClient */
  export async function send(this: wsClient, data: unknown) {
    if (typeof data === "object") data = JSON.stringify(data);
    this.ws.send(data, console.error);
  }
  export function onEvent(this: wsClient, msg: unknown) {}
}

/* 
  1. 用戶連線
  2. 伺服器發送 event:hello ( { op: 10, d: { heartbeat_interval: 1e3 * 10 } } )
  3. 用戶端接收到 hello 事件後 定時 ( event:hello.d.heartbeat_interval - 1e5 )ms， 向網管發送 event: Heartbeating ( { op: 1 } )
  4. 網管響應 event: HeartbeatACK ( { op: 11 } )
 */
export class wsClient extends EventEmitter {
  public send = <typeof wsFunc.send>wsFunc.send.bind(this);
  constructor(public readonly ws: WebSocket, public readonly server: wsServer) {
    super();
    console.log("ws: 用戶連線");
    wsFunc.clientInit.call(this);
  }
}

export class wsServer extends WebSocket.Server {
  public connection: wsClient[] = [];
  constructor(
    public readonly server: server,
    public options: WebSocket.ServerOptions = {}
  ) {
    super({ ...options, server: server.server });
    this.on("connection", (ws) => this.connection.push(new wsClient(ws, this)));
  }
  public send(data: unknown) {
    this.connection.forEach((ws) => ws.send(data));
  }
  public updata(data: unknown) {
    this.send({ op: opCode.Event, t: "updata", d: data });
  }
}

export enum opCode {
  /**客戶端讀取伺服器發送的事件
   * @type {Receive}
   */
  Event = 0,
  /**客戶端發送心跳
   * @type {Send | Receive}
   */
  Heartbeat,
  /**伺服器初始化完畢發送
   * @type {Receive}
   */
  Hello = 10,
  /**伺服器發送確認心跳
   * @type {Receive}
   */
  HeartbeatACK,
}
