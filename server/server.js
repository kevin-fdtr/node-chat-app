const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validations');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

io.on('connection', (socket) => {
  console.log('User connected');
  socket.on('disconnect', () => {
    console.log('User disconnected');
    var user = users.removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the chat.`));
    }
  });

  socket.on('join', ({name, room}, callback) => {
    if (!isRealString(name) || !isRealString(room)) {
      return callback('Display Name and Room Name are required.');
    }
    socket.join(room);
    users.removeUser(socket.id);
    users.addUser(socket.id, name, room);
    io.to(room).emit('updateUserList', users.getUserList(room));
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat App.'));
    socket.broadcast.to(room).emit('newMessage', generateMessage('Admin',`${name} has joined the chat.`));

    callback();
  });
  socket.on('createMessage', ({text}, callback) => {
    var user = users.getUser(socket.id);
    if (user && isRealString(text)) {
      newMessage = generateMessage(user.name, text);
      if (newMessage) {
        io.to(user.room).emit( 'newMessage', newMessage);
        callback();
      } else {
        console.log('Received invalid message');
      }
    }
  });
  socket.on('createLocationMessage', (coords) => {
    var user = users.getUser(socket.id);
    if (user) {
      var newMessage = generateLocationMessage(user.name, coords.latitude, coords.longitude);
      if (newMessage) {
        io.to(user.room).emit('newLocationMessage', newMessage);
      }
    }    
  });
});

app.use(express.static(publicPath));

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
