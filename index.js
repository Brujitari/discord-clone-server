const { PORT } = require("./environments");
const app = require("./app");


const main = async () => {
  (await app()).listen(PORT, () =>
    console.info(
      `😋 te escucho en el ${PORT} bb 🌈 entorno: ${process.env.NODE_ENV} 🦋`
    )
  );
};

main();