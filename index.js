require("dotenv").config();
const app = require("./app");
// const options = require("./configs/cors");


const main = async () => {
  (await app()).listen(process.env.PORT, () =>
    console.info(
      `😋🌈 te escucho en el ${process.env.PORT} bb 🦋`
    )
  );
};

main();