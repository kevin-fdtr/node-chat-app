const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
io.on('connection', (socket) => {
  console.log('User connected');
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat App'));
  socket.broadcast.emit('newMessage', generateMessage('Admin','New user joined'));
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
  socket.on('createMessage', ({from, text}, callback) => {
    newMessage = generateMessage(from, text);
    if (newMessage) {
      console.log(`Message reveived: ${newMessage.createdAt}`);
      io.emit( 'newMessage', newMessage);
      callback();
    } else {
      console.log('Received invalid message');
    }
  });
  socket.on('createLocationMessage', (coords) => {
    var newMessage = generateLocationMessage('Admin', coords.latitude, coords.longitude);
    if (newMessage) {
      io.emit('newLocationMessage', newMessage);
    }

  });
});

app.use(express.static(publicPath));

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
