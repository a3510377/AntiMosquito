import { MongoClient, ObjectId } from "mongodb";
import { config } from "dotenv";

import { makeId, makeToken } from "../utils/uuid";
import shortid from "shortid";
config();

console.log(new ObjectId().toString());

// $query
let db = new MongoClient(process.env.dbUri, {
  monitorCommands: true,
});
let id = makeId(9),
  token = makeToken(id);
let data = {
  _id: makeId(9) as unknown as ObjectId,
  Location: "",
  get Token() {
    return makeToken(this._id);
  },
};
console.log(data);

// db.connect().then(() => {
//   let siteInfo = db.db("data").collection("siteInfo");
//   //
//   siteInfo.insertOne(data).then((d) => console.log(d));
// });
//   siteInfo
//     .findOne({
//       ID: "455504617",
//     })
//     .then((d) => console.log(d));
// });
