import {
  MongoClient,
  MongoClientOptions,
  MongoServerError,
  ObjectId,
} from "mongodb";
import { config } from "dotenv";
import { getTokenData, makeId, makeToken } from "@/utils/uuid";
import { EventEmitter } from "events";
import { catchData } from "@/types/db.data";
import WS from "@/server/gateway";

config();

export default class db extends EventEmitter {
  catch: catchData = { api: { checks: {} } };
  client: MongoClient;
  protected link: boolean = false;
  protected _idIndex: number = 0;
  constructor(
    private ws: WS,
    public uri?: string,
    config?: MongoClientOptions
  ) {
    super();
    uri ||= process.env.dbUri;
    this.client = new MongoClient(uri, {
      monitorCommands: true,
      ...config,
    });
    /* https://docs.mongodb.com/drivers/node/current/fundamentals/monitoring/cluster-monitoring/ */
  }
  get db() {
    return this.client;
  }
  /**collection siteInfo */
  get siteInfo() {
    return this.db.db("data").collection("siteInfo");
  }
  /**db Mosquitos */
  get Mosquitos() {
    return this.db.db("Mosquitos");
  }
  /**添加站點 (經度, 緯度)*/
  async addSite(longitude: float, latitude: float, Ip: string) {
    this._idIndex = this._idIndex > 9 ? this._idIndex + 1 : 0;
    let data = {
      _id: makeId(this._idIndex) as unknown as ObjectId,
      Location: { longitude, latitude },
      Ip,
    };
    Object.assign(data, { Token: makeToken(data._id as unknown as string) });
    await this.siteInfo.insertOne(data);
    await this.Mosquitos.createCollection(data._id.toString());
    return data;
  }
  /**確認Token是否無誤 */
  async checkToken(Token?: string) {
    if (!Token) return false;
    return await this.siteInfo.findOne({ Token });
  }
  /**開始連線 */
  async run() {
    try {
      await this.client.connect();
      await this.db.db("admin").command({ ping: 1 });
    } finally {
      this.emit("ready", this);
      console.log("DB: 連結完成");
      await this.init();
    }
  }
  /**始初化 */
  async init() {
    [
      {
        db: "data",
        collection: "siteInfo",
      },
    ].forEach((value) => {
      this.db
        .db(value.db)
        .createCollection(value.collection)
        .catch((e) => {
          if (
            e instanceof MongoServerError &&
            e.message.startsWith("Collection already exists.")
          )
            console.log("DB: 資料庫以存在不進行創建");
        });
    });
    this.Mosquitos.watch().on("change", (next) => {
      delete next._id;
      this.ws.sendAll(next);
    });
  }
}
