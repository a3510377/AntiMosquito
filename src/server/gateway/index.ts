import WebSocket from "ws";
import { random } from "@/utils/main";
import { EventEmitter } from "events";
/* 
  1. 用戶連線
  2. 伺服器發送 event:hello ( { op: 10, d: { heartbeat_interval: 1e3 * 10 } } )
  3. 用戶端接收到 hello 事件後 定時 ( event:hello.d.heartbeat_interval - 1e5 )ms， 向網管發送 event: Heartbeating ( { op: 1 } )
  4. 網管響應 event: HeartbeatACK ( { op: 11 } )
 */
export class clientWs extends EventEmitter {
  constructor(public ws: WebSocket) {
    super();
    console.log("ws: 用戶連線");
    this.Hello();
    this.on("message", this.onMessage.bind(this));
  }
  /**send hello event
   * send op: 10
   */
  Hello() {
    this.send({
      op: 10,
      d: { heartbeat_interval: 1e3 * 10 * random(1, 0.8, false) },
    });
  }
  /**監聽用戶端傳來的心臟跳動
   * get op: 1
   * send op: 11
   */
  Heartbeat() {
    this.on("message", (msg) => {
      if (msg?.code !== 1) return;
      /* Heartbeat ACK */
      this.send({ op: 11 });
    });
  }
  /*  */
  /**轉換 JSON */
  msgToJson(msg: string) {
    try {
      return JSON.parse(msg);
    } catch {}
    return msg;
  }
  /* event */
  /**onMessage event */
  onMessage(msg: string) {
    this.emit("message", this.msgToJson(msg));
  }
  /*utils */
  /**send */
  send(data: string | object | number) {
    if (typeof data === "object") data = JSON.stringify(data);
    this.ws.send(data, (error) => console.error(error));
  }
}

export default class WS extends WebSocket.Server {
  constructor(options: WebSocket.ServerOptions) {
    super(options);
    this.init();
  }
  init() {
    this.on("connection", (ws) => new clientWs(ws));
  }
  send(data: string | object | number) {
    if (typeof data === "object") data = JSON.stringify(data);
    this.clients.forEach((client) => client.send(data));
  }
}
