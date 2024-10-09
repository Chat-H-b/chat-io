const express = require('express')
const http = require('http')
const socketIo = require("socket.io")
const cors = require("cors")
const path = require("path");


//import controller
const userController = require("./controllers/userController")
const roomController = require("./controllers/roomController")
const messageController = require("./controllers/messageController")


const app = express()
const port = 3000

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//api route
app.post("/register", userController.register)
app.post("/login", userController.login)


server.listen(port, () => {
    console.log(`http://localhost:${port}`);
})
