const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const message = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
io.on('connection', (socket) => {
  console.log('User connected');
  socket.emit('newMessage', message.generateMessage('Admin', 'Welcome to the Chat App'));
  socket.broadcast.emit('newMessage', message.generateMessage('Admin','New user joined'));
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
  socket.on('createMessage', ({from, text}, callback) => {
    newMessage = message.generateMessage(from, text);
    if (newMessage) {
      console.log(`Message reveived: ${newMessage.createdAt}`);
      io.emit( 'newMessage', newMessage);
      callback({
        status: 'Ok'
      });
    } else {
      console.log('Received invalid message');
    }
  });
});

app.use(express.static(publicPath));

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
