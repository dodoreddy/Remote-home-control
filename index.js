//imports
const express = require('express');
const path = require('path');
const socket = require('socket.io')
const fs = require('fs');

const sha256 = require("./sha256.js");
const run_socket = require("./socket_connections.js")

pwd = process.env['pasword']
//pwd getter from secret file
fs.readFile('./pwd.txt', 'utf8', (err, data) => {
  if (err){
    return
  }
  pwd = (data) 
})

no_pwd_users = 0;


pwd = sha256(pwd)
temp_no_del = toString(Math.random()*100000000000)
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
  realhash = sha256(id+pwd)
  if ((realhash == hash) && (users.includes(id) || temp_no_del == id)){
    if(no_pwd_users>1){
      res.send("TOOOOOO MANY PPL THUS YOU SHALL NOT PASS")
    }else{
      res.sendFile(path.join(__dirname, '/public/home/home.html'));
    }
  } else{
    res.send("FAIL!")
  }
});

//starts server
var server = app.listen(port);
console.log('Server started at http://localhost:' + port);

//io start
io = socket(server)

function arrayRemove(arr, value) {
 
   return arr.filter(function(geeks){
       return geeks != value;
   });
 
}
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
get_suburl = function(url){
    regex = /(?<=(.+\/\/.*\/)).+(?=\/)/g
    suburl = regex.exec(url)
    if (suburl != null){
      return suburl[0]
    }
    return "/"
}

//socket connection
io.on('connection', function(socket){
  users.push(socket.id)
  run_socket(socket)
  
  if (get_suburl(socket.handshake.headers.referer) == "home"){
    no_pwd_users += 1
  }
  socket.on('disconnect', function(){
    console.log(socket.id+":- Left the site")
    temp_no_del = socket.id
  })


  
})

