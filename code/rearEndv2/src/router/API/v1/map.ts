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

  for await (let _item of server.db.model.UserModel.aggregate([
    {
      $lookup: {
        from: "dataSchema",
        localField: "id",
        foreignField: "userId",
        as: "data",
      },
    },
  ])) {
    let item: userType & { data: dataType } = _item;
    if (!(item.area.county || item.area.town || item.area.village)) return;

    item.area.county;
  }

  res.write("retry: 1500\nevent: ready\ndata:\n\n");
});

export default router;
