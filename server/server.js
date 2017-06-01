const http = require('http');
const path = require('path');
const express = require('express');
const socketIO = require('socket.io');


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

  socket.on('createMessage', (messagefromUser) => {
    console.log('User sent new message', messagefromUser);
  });

  socket.emit('newMessage', {
    from: 'User1',
    text: 'You are a scrub at call of duty',
    createdAt: 123
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
