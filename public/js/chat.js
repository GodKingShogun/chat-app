var socket = io();

function scrollToBottom () {
  //Selectors
var messages = jQuery('#messages');
var newMessage = messages.children('li:last-child');
  //Heights
var clientHeight = messages.prop('clientHeight');
var scrollTop = messages.prop('scrollTop');
var scrollHeight = messages.prop('scrollHeight');
var newMessageHeight = newMessage.innerHeight();
var lastMessageHeight = newMessage.prev().innerHeight();

if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
messages.scrollTop(scrollHeight);
}

}

socket.on('connect', function () {
var params = jQuery.deparam(window.location.search);

socket.emit('Join', params, function (err) {
  if (err) {
    alert(err);
    window.location.href = '/';
  } else {
    console.log('No error');
  }
});
});

socket.on('newMessage', function (message) {
var formattedTime = moment(message.createdAt).format('h:mm a');
var template = jQuery('#message-template').html();
var html  = Mustache.render(template, {
  from: message.from,
  createdAt: formattedTime,
  text: message.text
});

jQuery('#messages').append(html);
scrollToBottom();
// console.log('Message', message);
// var li = jQuery('<li></li>');
// li.text(`${message.from} ${formattedTime}: ${message.text}`);
//
// jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
var formattedTime = moment(message.createdAt).format('h:mm a');
var template = jQuery('#location-message-template').html();
var html = Mustache.render(template, {
  from: message.from,
  createdAt: formattedTime,
  url: message.url
});

jQuery('#messages').append(html);
scrollToBottom();
// var li = jQuery("<li></li>");
// var a = jQuery("<a target=_blank>My current location</a>");
// li.text(`${message.from} ${formattedTime}: `);
// a.attr('href', message.url);
// li.append(a);
// jQuery('#messages').append(li);
});

socket.on('updateUserList', function (users) {
  var ol = jQuery('<ol></ol>');
  users.forEach( function (user) {
    ol.append(jQuery('<li></li>').text(user));
  });

  jQuery('#users').html(ol);
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
