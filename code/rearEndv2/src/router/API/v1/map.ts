/* /map */
import express from "express";

import { server } from "@/main/server";
import { userType } from "@/models/user";
import { dataType } from "@/models/data";

const router = express.Router();

router.get("/events", async (req, res) => {
  const server = <server>(<unknown>req.app.get("main"));
  res.set({
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });
  let data: {
    [county: string]: {
      main?: number;
      data?: {
        [town: string]: { main?: number; data?: { [village: string]: number } };
      };
    };
  } = {};

  for await (let _item of server.db.model.UserModel.find()) {
    let item: userType & { data: dataType[] } = <any>_item;
    let area = item.area;

    if (!area?.county || !area?.town || !area?.village) break;
    let mosquitos = 0;

    item.data = await server.db.model.DataModel.find({ userId: _item.id });

    item.data.forEach((_) => (mosquitos += _.mosquitos));

    data[area.county] ||= { main: 0, data: {} };
    data[area.county].main ||= 0;
    data[area.county].main += mosquitos;
    data[area.county].data[area.town] ||= { main: 0, data: {} };
    data[area.county].data[area.town].main += mosquitos;
    data[area.county].data[area.town].data ||= {};
    data[area.county].data[area.town].data[area.village] ||= 0;
    data[area.county].data[area.town].data[area.village] += mosquitos;
  }

  res.write(
    `retry: 1500\nevent: set\ndata:${JSON.stringify({ type: "ram", data })}\n\n`
  );

  server.db.model.DataModel.on("updata", async (data) => {
    let _: userType | undefined = await server.db.model.UserModel.find({
      id: data.userId,
    })?.[0];
    let area = _?.area;
    if (!_ || !area?.county || !area?.town || !area?.village) return;
    res.write(
      `type: add\ndata:${JSON.stringify({
        type: "count",
        mosquitos: data.mosquitos,
        data: `${area.county}.${area.town}.${area.village}`,
      })}\n\n`
    );
  });
});

export default router;
