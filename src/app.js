

const express = require('express')
const app = express()
require('dotenv').config()
require('./db/mongoose')
const http = require('http')
const server = http.createServer(app)
const cookieParser = require('cookie-parser')
const socketio = require('socket.io')

const messageRouter = require('./routers/message')
const userRouter= require('./routers/user')
const teamRouter = require('./routers/team')
const todoRouter = require('./routers/todo')
const notificationRouter = require('./routers/notification')
const timelineRouter = require('./routers/timeline')
app.use(express.json())
app.use(cookieParser())


app.use('/api', messageRouter)
app.use('/api', userRouter)
app.use('/api', teamRouter)
app.use('/api', todoRouter)
app.use('/api', notificationRouter)
app.use('/api', timelineRouter)







const port = process.env.PORT || 4000

if (process.env.NODE_ENV === 'production') {
  // ... other app.use middleware 
  const path = require('path')
  app.use(express.static(path.join(__dirname,  "clients", "build")))

  app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "clients", "build", "index.html"));
  });
  } 
  
  /* const io = socketio(server) */
  const io = require('socket.io')(server, { origins: process.env.PORT});
  
  io.on('connection', (socket) => {
    
    socket.on('disconnect', () => {
    })
    
    socket.on('createTodo', (todo) => {
      io.emit("newNotification")
    })
    
    socket.on("sendTeamMessage", (message) => {
      io.send(message).emit("message")
    })
    
  })
  
  
    server.listen(port, () => {
      console.log("up and running")
    })
module.exports = server