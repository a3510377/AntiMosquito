import { EventEmitter } from "events";
import WebSocket from "ws";

import { server } from "./server";

export class wsFunc {
  public static msgToJson(msg: WebSocket.RawData): string | Object {
    let data = msg.toString();
    try {
      data = JSON.parse(data);
    } catch {}
    return data;
  }
  public static onMessage(this: wsClient, msg: MessageType) {}
}

/* 
  1. 用戶連線
  2. 伺服器發送 event:hello ( { op: 10, d: { heartbeat_interval: 1e3 * 10 } } )
  3. 用戶端接收到 hello 事件後 定時 ( event:hello.d.heartbeat_interval - 1e5 )ms， 向網管發送 event: Heartbeating ( { op: 1 } )
  4. 網管響應 event: HeartbeatACK ( { op: 11 } )
 */
export class wsClient extends EventEmitter {
  constructor(public readonly ws: WebSocket, public readonly server: wsServer) {
    super();
    this.hello();
    console.log("ws: 用戶連線");
    ws.on("message", (msg) =>
      this.emit("message", wsFunc.onMessage.bind(this, wsFunc.msgToJson(msg)))
    );
    this.init();
  }
  public init() {}
  public hello() {
    // this.send({ op: 10, d: { heartbeat_interval: this.heartbeat_interval } });
  }
  public send(data: string | object | number) {
    if (typeof data === "object") data = JSON.stringify(data);
    this.ws.send(data, (error) => error && console.error(error));
  }
}

export class wsServer extends WebSocket.Server {
  constructor(
    protected readonly server: server,
    public options: WebSocket.ServerOptions = {}
  ) {
    super(options);
    this.on("connection", (ws) => new wsClient(ws, this));
  }
}

export interface Events {
  Hello: { heartbeat_interval: number };
}

export enum opCode {
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

export interface MessageType {
  t: opCode;
  d: {};
}
