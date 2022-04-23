/* /postImg */
import express from "express";

import { server } from "@/main/server";
import { userType } from "@/models/user";

const router = express.Router();

router
  .get("/find", async (req, res) => {
    const server = <server>(<unknown>req.app.get("main"));
    const keyword = req.query.keyword;
    if (!keyword) return res.status(400).send({ message: "missing keyword" });
    const regexFind = { $regex: keyword, $options: "i" };
    res.send(
      await server.db.model.UserModel.find({
        $or: [
          { id: regexFind },
          { name: regexFind },
          { description: regexFind },
        ],
      }).then((data) =>
        data.map((item) => {
          delete item.__v;
          delete item._id;

          return item;
        })
      )
    );
  })
  .patch("/:id/edit", async (req, res) => {
    const server = <server>(<unknown>req.app.get("main"));
    const changes = <Omit<userType, "id">>req.body;
    res.send(
      await server.db.model.UserModel.updateOne(
        { id: req.params.id },
        {
          name: changes.name,
          description: changes.description,
          location: {
            latitude: changes.location.latitude,
            longitude: changes.location.longitude,
          },
          area: {
            county: changes.area.county,
            town: changes.area.town,
            village: changes.area.village,
          },
        }
      ).catch(() => (res.status(404), {}))
    );
  });

export default router;
