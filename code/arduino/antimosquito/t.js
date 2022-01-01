import net from "net";

const client = new net.Socket();
const HOST = "127.0.0.1";

client.connect(5050, HOST, () => {
  client.write(
    "GET /api/v1/nowData?ip=1.1.1.1&time=999999&humidity=1&mosquitos=1&temperature=1 HTTP/1.1\r\n"
  );
  client.write(`Host: ${HOST}\r\n`);
  client.write("Content-Type: application/json\r\n");
  client.write("authorization: awa\r\n");
  client.write("\r\n");
});

client.on("data", (data) => {
  console.log(`Received: ${data}`);
  client.destroy();
});

client.on("close", () => console.log("Connection closed"));
