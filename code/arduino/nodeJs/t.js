import { Socket } from "net";

const client = new Socket();
const HOST = "antimosquito.a102009102009.repl.co"; //localhost

client.connect(443, HOST, () => {
  client.write("GET /api HTTP/1.1\r\n");
  client.write(`Host: ${HOST}\r\n`);
  client.write("Content-Type: application/json\r\n");
  client.write("\r\n");
});

client.on("data", (data) => {
  console.log(`callback: ${data}`);
  client.destroy();
});

client.on("close", () => console.log("close"));
