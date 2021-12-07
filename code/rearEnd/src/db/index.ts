import { MongoClient } from "mongodb";

const uri = process.env["dbUri"];
if (!uri) throw "";

// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// client.connect((err) => {
//   const collection = client.db("test").collection("devices");
//   console.log(collection);
//   client.close();
// });
export default () => {};
