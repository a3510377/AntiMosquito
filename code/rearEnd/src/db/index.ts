import { Db, MongoClient, MongoClientOptions, ServerApiVersion } from "mongodb";
import { MongoServerError } from "mongodb";
import { config } from "dotenv";
config();

export default class db {
  client: MongoClient;
  link: boolean = false;
  constructor(public uri?: string, config?: MongoClientOptions) {
    let client: MongoClient;

    uri ||= process.env.dbUri;
    this.client = client = new MongoClient(uri, {
      monitorCommands: true,
      ...config,
    });
    /* https://docs.mongodb.com/drivers/node/current/fundamentals/monitoring/cluster-monitoring/ */
  }
  get db() {
    return this.client;
  }

  /* get 集合 */
  collection(dbName: string, name: string) {
    return this.db.db(dbName).collection(name);
  }

  async run() {
    try {
      await this.client.connect();
      await this.db.db("admin").command({ ping: 1 });
    } finally {
      console.log("DB: 連結完成");
      await this.init();
    }
  }
  async init() {
    [
      {
        db: "Mosquitos",
        collection: "Mosquitos",
      },
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
