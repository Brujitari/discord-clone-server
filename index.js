require("dotenv").config();
const { PORT } = require("./environments");
const http = require('http')
const socketio = require('socket.io')
const express = require("express");
const app = express();
const cors = require("cors");

const cookieParser = require("cookie-parser");
const errors = require("./errors/commons");

const main = async () => {
  const db = await require("./configs/db");
  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());

  const server = http.createServer(app)
  const io = socketio(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  })
  
  io.on('connection', (socket) => {
    
    socket.on('disconnect', reason => {
      console.log(`Disconnected: ${socket.id}, reason: ${reason}`)
    });
    
    socket.on('message', (data) => { //meto roomId
      const { message, room } = data; //sender_id, receiver_id
      const time = socket.handshake.time
      console.log(message, room, time)
      if (room) io.to(room).emit('chat', { message, room });
      
    });
    
  });

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



  server.listen(process.env.PORT || 3001, () => {
    console.info(`😋 te escucho en el ${PORT} bb 🌈 entorno: ${process.env.NODE_ENV} 🦋`)
  })
};

main();