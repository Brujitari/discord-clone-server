require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const options = require("./configs/cors");
//const db = require("./configs/db");

const app = express();

app.use(cors(options));
app.use(express.json());
app.use(cookieParser());




app.listen(process.env.PORT, () =>
  console.info(`😋🌈 te escucho en el ${process.env.PORT} bb 🦋`)
);