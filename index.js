//imports
const express = require('express');
const path = require('path');
const socket = require('socket.io')
const fs = require('fs');
pwd = process.env['pasword']
const sha256 = require("./sha256.js");


fs.readFile('./pwd.txt', 'utf8', (err, data) => {
  if (err){
    return
  }
  pwd = (data) 
})


users = []
//port and express init
const app = express();
const port = process.env.PORT || 3000;

//allows acess to landing page
app.use('/', express.static('public/landing_page'));

//lanidng page start
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/landing_page/index.html'));
});

//allows acsess to home page
app.use('/home', express.static('public/home'));

//home page start
app.get('/home', function(req, res) {
  data = req.query
  id = data.id
  hash = data.hash
  console.log(pwd)
  console.log(id)
  realhash = sha256(id+pwd)
  console.log('\n\nhash:- '+realhash+'\nGiven Hash:- '+hash)
  if (realhash == hash){
      res.sendFile(path.join(__dirname, '/public/home/home.html'));
  } else{res.send("NO")}
});

//starts server
var server = app.listen(port);
console.log('Server started at http://localhost:' + port);

//io start
io = socket(server)

//socket connection
io.on('connection', function(socket){
  console.log("Made a connection:- "+socket.id)
  users.push(socket.id)
  io.to(socket.id).emit('id', socket.id)

  socket.on('pwd', function(data){
    console.log(data)
  })
})