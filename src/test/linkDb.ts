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

db.connect().then(async () => {
  let Mosquitos = await db.db("Mosquitos").collections();
  let data = {};
  await Promise.all(
    Mosquitos.map(async (site) =>
      (
        await site.find().toArray()
      ).forEach((info) => {
        delete info._id;
        let area = info.location.area;
        let _t = `${area.county}${area.town}${area.village}`;
        data[_t] ||= [];
        data[_t].push(info);
      })
    )
  );
  console.log(data);
});
