const router = require("express").Router();

module.exports = (db) => {
  router.use("/auth", require("./auth")(db));
  router.use("/messages", require("./messages")(db));

  return router;
};
