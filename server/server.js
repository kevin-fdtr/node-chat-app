const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const message = require('../shared/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
  socket.on('createMessage', ({from, text}) => {
    newMessage = message.createMessage({from, text});
    if (newMessage) {
      console.log(`Message reveived: ${newMessage.createdAt}`);
      io.emit( 'newMessage', newMessage);
    } else {
      console.log('Received invalid message');
    }
  });
});

app.use(express.static(publicPath));

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
