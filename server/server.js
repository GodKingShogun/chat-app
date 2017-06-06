const http = require('http');
const path = require('path');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validate');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();

var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log("New user connected");

  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the room`));
    }
  });



  socket.on('Join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback("Name and room name required");
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);
    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat'));

    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} joined chat`));

      callback();
  });

  socket.on('createMessage', (messageFromUser, callback) => {
    var user = users.getUser(socket.id);

    if(user && isRealString(messageFromUser.text)) {
    io.to(user.room).emit('newMessage', generateMessage(user.name, messageFromUser.text));
    }


    callback("This is from the server");
  });

  socket.on('send-location', (coords) => {
    var user = users.getUser(socket.id);

    if (user) {
  io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.lat, coords.lon));
  }
  });

});

// app.get('/', (req, res) => {
// res.render("index.html", {
//   pageTitle: "Home page"
// });
// });

server.listen(port, (req, res) => {
console.log(`Port is up on port ${port}`);
});
