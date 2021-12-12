import db from "@/db";

let t = new db();
(async () => {
  await t.run();
  await t.makeSite("awa awa");
})();
