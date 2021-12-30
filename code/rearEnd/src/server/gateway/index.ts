import serverDb from "@/db";
import WebSocket from "ws";
import { random } from "@/utils/main";
import { EventEmitter } from "events";
import { WithId } from "mongodb";
import { opCode } from "./data";
/* 
  1. 用戶連線
  2. 伺服器發送 event:hello ( { op: 10, d: { heartbeat_interval: 1e3 * 10 } } )
  3. 用戶端接收到 hello 事件後 定時 ( event:hello.d.heartbeat_interval - 1e5 )ms， 向網管發送 event: Heartbeating ( { op: 1 } )
  4. 網管響應 event: HeartbeatACK ( { op: 11 } )
 */
export class clientWs extends EventEmitter {
  private certification: boolean = false;
  private lastTime: number = -1;
  readonly heartbeat_interval: number = ~~(1e3 * 30 * random(1, 0.8, false));
  private chick_loop: NodeJS.Timer;
  private type: "web" | "client" = void 0;
  private token: false | WithId<Document> = void 0;
  public Errors: Errors = new Errors(this);
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
    return await this.db.checkToken(
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
        return this.send({ code: 400 });
      switch (msg.op) {
        case opCode.Heartbeat:
          this.Heartbeat();
          break;
        case opCode.Identify:
          if ("t" in msg && msg.t === "web") {
            this.type = "web";
            this.send({ op: 0, t: "ready" });
          } else if ("d" in msg && msg.d.token) {
            let chickToken = await this.Identify(msg);
            this.certification = !!chickToken;
            if (!chickToken) this.send({ op: 0, type: "client" });
          }
          break;
        case opCode.HeartbeatACK:
          if (msg.t !== "web" && !this.certification) return;
          this.Heartbeat();
          break;
        default:
          if (!this.certification && this.type !== "web")
            return this.Errors.noCertification();
          return this.Errors.noOpcode();
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
export class Errors {
  private ws: WebSocket;
  constructor(private client: clientWs) {
    this.ws = this.client.ws;
  }
  noCertification() {
    this.client.send({ error: { code: 4003, message: "未認證" } });
  }
  noOpcode() {
    this.client.send({ error: { code: 4001, message: "未知操作碼" } });
  }
}
