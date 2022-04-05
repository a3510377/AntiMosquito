const express = require("express");
const cors = require("cors");

const app = express();

app
  .use(cors())
  .get("/test", (req, res) => {
    res.set({
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    });
    app.on("message", (data) => {
      res.write("event: message\n");
      res.write(`data: ${JSON.stringify(data)}\n\n`);
    });
  })
  .get("/test2", (req, res) => {
    let data = { test: "test", _: req.query || {} };
    app.emit("message", data);
    res.json(data);
  });

app.listen(9900, () => {
  console.log("ready");
});
