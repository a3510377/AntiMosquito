import serverDb from "@/db";
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
  certification: boolean = false;
  lastTime: number = -1;
  heartbeat_interval: number = ~~(1e3 * 30 * random(1, 0.8, false));
  chick_loop: NodeJS.Timer;
  constructor(public readonly ws: WebSocket, private readonly db: serverDb) {
    super();
    console.log("ws: 用戶連線");
    this.Hello();
    ws.on("message", (msg) =>
      this.emit("message", this.msgToJson(msg.toString()))
    );
    this.init();
    this.chick_loop = setInterval(
      () => this.ws.close(4009),
      this.heartbeat_interval + 1e3 * 5
    );
  }
  /**send hello event
   * @send op: 10
   */
  Hello() {
    this.send({ op: 10, d: { heartbeat_interval: this.heartbeat_interval } });
  }
  /**回復心臟跳動
   * @get op: 1
   * @send op: 11
   */
  Heartbeat() {
    /* Heartbeat ACK */
    this.send({ op: 11 });
  }
  /**認證
   * @get op: 2
   */
  async Identify(data: { token: string } | Object) {
    return this.db.checkToken(
      "token" in data && typeof data?.token === "string" ? data.token : void 0
    );
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
  /*utils */
  /**init */
  init() {
    this.on("message", async (msg) => {
      if (
        typeof msg === "string" ||
        (typeof msg === "object" && typeof msg.op === "number")
      )
        return this.ws.send({ code: 400 });
      switch (msg.op) {
        case 1:
          this.Heartbeat();
          break;
        case 2:
          if ("d" in msg && msg.d.token) await this.Identify(msg);
          break;
        default:
          if (!this.certification)
            return this.ws.send({
              error: { code: 4003, message: "未認證" },
            });
          this.ws.send({
            error: { code: 4001, message: "未知操作碼" },
          });
      }
    });
  }
  /**send */
  send(data: string | object | number) {
    if (typeof data === "object") data = JSON.stringify(data);
    this.ws.send(data, (error) => console.error(error));
  }
}

export default class WS extends WebSocket.Server {
  db: serverDb = new serverDb();
  constructor(options: WebSocket.ServerOptions) {
    super(options);
    this.init();
  }
  init() {
    this.on("connection", (ws) => new clientWs(ws, this.db));
  }
  sendAll(data: string | object | number) {
    if (typeof data === "object") data = JSON.stringify(data);
    this.clients.forEach((client) => client.send(data));
  }
}
