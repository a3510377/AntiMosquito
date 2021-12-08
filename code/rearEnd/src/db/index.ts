import { MongoClient, MongoClientOptions, ServerApiVersion } from "mongodb";
import { MongoParseError } from "mongodb";
import { config } from "dotenv";
config();

export default class db {
  client: MongoClient;
  link: boolean = false;
  constructor(public uri?: string, config?: MongoClientOptions) {
    let client: MongoClient;

    uri ||= process.env["dbUri"];
    this.client = client = new MongoClient(uri, {
      monitorCommands: true,
      ...config,
    });
    /* https://docs.mongodb.com/drivers/node/current/fundamentals/monitoring/cluster-monitoring/ */
    // client.on("commandStarted", (event) => console.debug(event));
    // client.on("commandSucceeded", (event) => console.debug(event));
    // client.on("commandFailed", (event) => console.debug(event));
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
      console.log("連結完成");
    }
  }
  async init() {
    let dbo = this.db.db("AntiMosquito");
    dbo.createCollection("Mosquitos", (error) => console.log(error));
  }
}
// db.run().catch(console.dir);
