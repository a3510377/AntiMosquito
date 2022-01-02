import { EventEmitter } from "events";
import { opCode } from "./wsData";

export class ws extends EventEmitter {
  /**握手定時 */
  HeartbeatInterval?: number;
  ws?: WebSocket;
  usClose: boolean = false;
  constructor(private url: string) {
    super();
    if (!url.startsWith("wss://")) this.url = `ws://${url}`;
  }
  get wsUrl() {
    return this.url;
  }
  async connect() {
    this.usClose = false;
    let ws = (this.ws = new WebSocket(this.url));
    ws.onopen = this.onOpen.bind(this);
    ws.onmessage = this.onMessage.bind(this);
    ws.onerror = this.onError.bind(this);
    ws.onclose = this.onClose.bind(this);
  }
  sendWs(data: JsonAny) {
    return this.ws?.send(JSON.stringify(data));
  }
  onOpen() {
    this.usClose = false;
  }
  onMessage(ev: MessageEvent<any>) {
    const json = JSON.parse(ev.data || "{}");

    switch (json.op) {
      case opCode.Hello:
        if (!json?.d?.heartbeat_interval) return this.close(false);
        this.Identifying();
        this.setHeartbeatInterval(json?.d?.heartbeat_interval as number);
        break;
      case opCode.Event:
        if (!json.t) return;
        switch (json.t) {
          case "updata":
            this.emit("updata", json.d);
            break;
        }
        break;
    }
  }
  onError() {}
  onClose() {
    if (!this.usClose) setTimeout(() => this.Resuming(), 2e3);
  }
  /**回復心跳 */
  Heartbeat() {
    console.debug("ws", "發送心跳確認");
    this.sendWs({ op: 1 });
  }
  /**連線 */
  Identifying() {
    this.sendWs({ op: opCode.Identify, t: "web" });
  }
  /* ----- fun ----- */
  /**重新連線 */
  Resuming() {
    this.ws?.close();
    this.connect();
  }
  /**關閉連線 */
  close(usClose: boolean = true) {
    this.usClose = usClose;
    this.ws?.close();
  }
  setHeartbeatInterval(delay: number) {
    clearInterval(this.HeartbeatInterval);
    if (delay === -1) return;
    this.HeartbeatInterval = window.setInterval(
      () => this.Heartbeat(),
      delay - 1e3
    );
  }
}
