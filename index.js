require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");


const app = express();

app.use(express.json());
app.use(cookieParser());




app.listen(process.env.PORT, () =>
  console.info(`😋🌈 te escucho en el ${process.env.PORT} bb 🦋`)
);