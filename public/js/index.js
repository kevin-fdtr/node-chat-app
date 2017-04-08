var socket = io();

socket.on('connect', function () {
    console.log('Connected to Server');
    socket.emit('createMessage', {
        to: 'kevin@fdtr.ca',
        text: 'Hello Server!'
    });
});
socket.on('disconnect', function () {
    console.log('Disconnected from Server');
});
socket.on('newMessage', function (email) {
    console.log('New Message', email);
});