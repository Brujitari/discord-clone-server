const router = require("express").Router();

module.exports = (db) => {
  router.post("/send", require("./send")(db));

  return router;
};
