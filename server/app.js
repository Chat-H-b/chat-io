const express = require('express')
const http = require('http')
const socketIo = require("socket.io")
const cors = require("cors")
const path = require("path");


//import controller

const app = express()
const port = 3000

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//api route


io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("join:room", (room) => {
    socket.join(room)
    console.log(room);


  })
  socket.on("message:new", ({ room, message }) => {
    if (room && message) {
      // Emit the new message to all clients in the specified room
      io.to(room).emit("message:update", {
        from: socket.handshake.auth.email || 'Anonymous',
        message
      });
      console.log(`Message from ${socket.handshake.auth.email || 'Anonymous'} in room ${room}: ${message}`);
    } else {
      console.log("Invalid message data received:", { room, message });
    }
  });




  if (socket.handshake.auth) {
    console.log("email :" + socket.handshake.auth.email);
  }
  return () => {
    socket.off("message:update")
    socket.disconnect()
  }
  // socket.on("")
})

// socket.on("message:new")

server.listen(port, () => {
  console.log(`http://localhost:${port}`);
})
