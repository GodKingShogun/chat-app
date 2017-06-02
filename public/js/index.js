var socket = io();

socket.on('connect', function () {
  console.log('Connceted to server');
});

socket.on('newMessage', function (message) {
console.log('Message', message);
var li = jQuery('<li></li>');
li.text(`${message.from}: ${message.text}`);

jQuery('#messages').append(li);
});



socket.on('disconnect', function () {
console.log('Disconnected from server');
});

jQuery('[name=button]').on('click', function (e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: "User1",
    text: jQuery('[name=message]').val()
  }, function () {

  });
});
