import net from "net";

const client = new net.Socket();
const HOST = "192.168.137.1";

client.connect(3000, HOST, () => {
  console.log("Connected");
  client.write("POST /api/v1/postData HTTP/1.1\r\n");
  client.write(`Host: ${HOST}\r\n`);
  client.write("Content-Type: application/json\r\n");
  client.write("\r\n");
});

client.on("data", function (data) {
  console.log("Received: " + data);
  client.destroy(); // kill client after server's response
});

client.on("close", function () {
  console.log("Connection closed");
});
