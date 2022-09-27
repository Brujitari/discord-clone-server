const express = require("express");
const app = express();
const cors = require("cors");

const cookieParser = require("cookie-parser");
const errors = require("./errors/commons");
const options = require("./configs/cors");


module.exports = async () => {
  const db = await require("./configs/db");
  app.use(cors(NODE_ENV !== 'production' && options));
  app.use(express.json());
  
  app.use(cookieParser());
  app.use(require("./services")(db));

  app.use((_, __, next) => {
    next(errors[404]);
  });
  
  app.use(({ statusCode, error }, _, res, __) => {
    res.status(statusCode).json({
      success: false,
      message: error.message,
    });
  });

  return app;
};

