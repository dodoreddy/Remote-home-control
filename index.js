const express = require('express');
const path = require('path');
const socket = require('socket.io') 

const app = express();
const port = process.env.PORT || 3000;

app.use('/', express.static('public/landing_page'));

// sendFile will go here
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/landing_page/index.html'));
});

app.use('/home', express.static('public/home'));

app.get('/home', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/home/index.html'));
});

var server = app.listen(port);
console.log('Server started at http://localhost:' + port);

io = socket(server)

io.on('connection', function(socket){
  console.log("Made a connection:- "+socket.id)

  socket.on('pwd', function(data){
    console.log(data)
  })
})