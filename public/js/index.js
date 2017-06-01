var socket = io();

socket.on('connect', function () {
  console.log('Connceted to server');

  socket.emit('createMessage', {
    from: "User2",
    text: "I'm better than your mom"
  });

});

socket.on('newMessage', function(messageN) {
  console.log('Received new message', messageN);
});

socket.on('disconnect', function () {
console.log('Disconnected from server');
});
