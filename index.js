const { PORT } = require("./environments");
const app = require("./app");
const http = require('http')
const server = http.createServer(app)
const socketio = require('socket.io')
const io = socketio(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
})

server.listen(process.env.PORT || 3001, () => {
  console.info(`😋 te escucho en el ${PORT} bb 🌈 entorno: ${process.env.NODE_ENV} 🦋`)
})

// const main = async () => {
//   (await app()).listen(PORT, () =>
//     console.info(
//       `😋 te escucho en el ${PORT} bb 🌈 entorno: ${process.env.NODE_ENV} 🦋`
//     )
//   );
// };

// main();