const express = require('express');

const app = express();
const server = require('http').createServer(app)
const io = require('socket.io')(server);


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

const messages = [];

io.on('connection', (socket) => {
  console.log(`usuário conectado' ${socket.id}`);

  socket.emit('previousMessage', messages);

  socket.on('sendMessage', data => {
    messages.push(data);
    socket.broadcast.emit('receivedMessage', data);
    
    console.log(messages);
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
