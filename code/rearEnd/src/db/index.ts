import { MongoClient, MongoClientOptions, MongoServerError } from "mongodb";
import { config } from "dotenv";
import { getTokenData } from "@/utils/uuid";
import { siteInfo } from "@/types/db.data";
config();

export default class db {
  client: MongoClient;
  link: boolean = false;
  constructor(public uri?: string, config?: MongoClientOptions) {
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
  /**確認Token是否無誤 */
  async checkToken(token: string): Promise<boolean> {
    let tokenData = getTokenData(token);
    if (!tokenData) return false;
    let data = await this.siteInfo.findOne({ ID: tokenData.id.$10.toString() });
    return data?.Token === token;
  }
  /**開始連線 */
  async run() {
    try {
      await this.client.connect();
      await this.db.db("admin").command({ ping: 1 });
    } finally {
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
  }
}
