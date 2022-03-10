import { EventEmitter } from "events";
/* 
  1. 用戶連線
  2. 伺服器發送 event:hello ( { op: 10, d: { heartbeat_interval: 1e3 * 10 } } )
  3. 用戶端接收到 hello 事件後 定時 ( event:hello.d.heartbeat_interval - 1e5 )ms， 向網管發送 event: Heartbeating ( { op: 1 } )
  4. 網管響應 event: HeartbeatACK ( { op: 11 } )
 */
export class clientWs extends EventEmitter {}
