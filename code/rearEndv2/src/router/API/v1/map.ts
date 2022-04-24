/* /map */
import express from "express";

const router = express.Router();

router.get("/events", (req, res) => {
  res.set({
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  res.write("retry: 1500\nevent: ready\ndata:\n\n");
});

export default router;
