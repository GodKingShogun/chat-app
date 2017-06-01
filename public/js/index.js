var socket = io();

socket.on('connect', function () {
  console.log('Connceted to server');
});

socket.on('newMessage', function (message) {
console.log('Message', message);
});

socket.on('disconnect', function () {
console.log('Disconnected from server');
});