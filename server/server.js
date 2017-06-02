const http = require('http');
const path = require('path');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();

var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log("New user connected");

  socket.on('disconnect', () => {
    console.log('Disconnected from client');
  });

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

  socket.on('createMessage', (messageFromUser) => {
    console.log('User sent new message', messageFromUser);

    io.emit('newMessage', generateMessage(messageFromUser.from, messageFromUser.text));
    // socket.broadcast.emit('newMessage', {
    //   from: messageFromUser.from,
    //   text: messageFromUser.text,
    //   createdAt: new Date().getTime()
    // });
  });

});

app.get('/', (req, res) => {
res.render("index.html", {
  pageTitle: "Home page"
});
});

server.listen(port, (req, res) => {
console.log(`Port is up on port ${port}`);
});
