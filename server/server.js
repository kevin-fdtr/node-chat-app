const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
io.on('connection', (socket) => {
  console.log('User connected');

  socket.emit('newMessage', {
    from: 'Server',
    text: 'Message(Server): Welcome!',
    createdAt: new Date()
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
  socket.on('createMessage', ({to, text}) => {
    if (to && text) {
      console.log(`${new Date()}  ${to}: ${text}`);
    } else {
      console.log('Received invalid message');
    }
  });
});


app.use(express.static(publicPath));

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});