/* const server = require('./app')
const socketio = require('socket.io')
const http = require('http')
const io = socketio(server)
const express = require('express')







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







module.exports = server */