var socket = io();

socket.on('connect', function () {
  console.log('Connceted to server');
});

socket.on('newMessage', function (message) {
var formattedTime = moment(message.createdAt).format('h:mm a');
console.log('Message', message);
var li = jQuery('<li></li>');
li.text(`${message.from} ${formattedTime}: ${message.text}`);

jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
var formattedTime = moment(message.createdAt).format('h:mm a');
var li = jQuery("<li></li>");
var a = jQuery("<a target=_blank>My current location</a>");
li.text(`${message.from} ${formattedTime}: `);
a.attr('href', message.url);
li.append(a);
jQuery('#messages').append(li);
});



socket.on('disconnect', function () {
console.log('Disconnected from server');
});

jQuery('#send-message').on('click', function (e) {
  var textInputField = jQuery('[name=message]');
  e.preventDefault();

  socket.emit('createMessage', {
    from: "User1",
    text: textInputField.val()
  }, function () {
    textInputField.val('');
  });
});

var sendLocation = jQuery('#send-location');
sendLocation.on('click', function () {
if (!navigator.geolocation) {
  return alert('Geaolocation is not supported');
}

sendLocation.attr('disabled', 'disabled').text('Sending location ...');

navigator.geolocation.getCurrentPosition(function (position){
sendLocation.removeAttr('disabled').text('Send location');
  socket.emit('send-location', {
    lat: position.coords.latitude,
    lon: position.coords.longitude
  }, function() {
    sendLocation.removeAttr('disabled').text('Send location');
    alert("Unable to get location");
  });
});
});
