import net from "net";

const client = new net.Socket();
const HOST = "192.168.0.138";
const token = "ppml5Juie2o8dLTm.1k1kk0g.YNrYQHHXirtl8CK1qIOD";
const path = "/api/v1/nowData";
const ip = "114.529.1.1";

client.connect(3000, HOST, () => {
  client.write("GET " + path + "/" + token + "/" + ip + "/1 HTTP/1.1\r\n");
  client.write(`Host: ${HOST}\r\n`);
  client.write("Content-Type: application/json\r\n");
  client.write("\r\n");
});

client.on("data", (data) => {
  console.log(`Received: ${data}`);
  client.destroy();
});

client.on("close", () => console.log("Connection closed"));
