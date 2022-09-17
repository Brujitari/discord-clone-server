require("dotenv").config();
const { PORT } = require("./environments");
const app = require("./app");
const http = require('http')
const socketio = require('socket.io')

const main = async () => {
  const server = http.createServer((await app()))
  const io = socketio(server, {
      cors: {
          origin: "*",
          methods: ["GET", "POST"]
        }
      })
  
  server.listen(process.env.PORT || 3001, () => {
    console.info(`😋 te escucho en el ${PORT} bb 🌈 entorno: ${process.env.NODE_ENV} 🦋`)
  })
};

main();
