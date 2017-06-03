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

socket.on('newLocationMessage', function (message) {
var li = jQuery("<li></li>");
var a = jQuery("<a target=_blank>My current location</a>");
li.text(`${message.from}: `);
a.attr('href', message.url);
li.append(a);
jQuery('#messages').append(li);
});



socket.on('disconnect', function () {
console.log('Disconnected from server');
});

jQuery('#send-message').on('click', function (e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: "User1",
    text: jQuery('[name=message]').val()
  }, function () {

  });
});

var sendLocation = jQuery('#send-location');
sendLocation.on('click', function () {
if (!navigator.geolocation) {
  return alert('Geaolocation is not supported');
}

navigator.geolocation.getCurrentPosition(function (position){
  socket.emit('send-location', {
    lat: position.coords.latitude,
    lon: position.coords.longitude
  }, function() {
    alert("Unable to get location")
  });
});
});
