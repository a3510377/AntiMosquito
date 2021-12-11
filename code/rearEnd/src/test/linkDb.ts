import { MongoClient } from "mongodb";
import { config } from "dotenv";

import { makeId, makeToken } from "../utils/uuid";

config();

// $query
let db = new MongoClient(process.env.dbUri, {
  monitorCommands: true,
});
// let id = makeId(9),
// token = makeToken(id);

db.connect().then(() => {
  let siteInfo = db.db("data").collection("siteInfo");
  // siteInfo
  //   .insertOne({
  //     Location: "",
  //     Token: token,
  //     ID: id,
  //   })
  //   .then((d) => console.log(d));

  siteInfo
    .findOne({
      ID: "455504617",
    })
    .then((d) => console.log(d));
});
