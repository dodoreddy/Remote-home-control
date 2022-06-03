//imports
const express = require('express');
const path = require('path');
const socket = require('socket.io')
const fs = require('fs');

//modules made by me
const sha256 = require("./sha256.js");
const run_socket = require("./socket_connections.js")


//if repl get repl pwd
pwd = process.env['pasword']
//else gets pwd from secret file on comp
fs.readFile('./pwd.txt', 'utf8', (err, data) => {
  if (err){
    return
  }
  pwd = (data) 
})

//important variables
no_pwd_users = 0;
pwd = sha256(pwd)
temp_no_del = toString(Math.random()*100000000000)
users = []

//port and express init
const app = express();
const port = process.env.PORT || 3000;

//allows acess to landing page
app.use('/', express.static('public/landing_page'));

//landing page start
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/landing_page/index.html'));
});

//allows acsess to home page
app.use('/home', express.static('public/home'));

//home page start
app.get('/home', function(req, res) {
  //gets data from url
  data = req.query
  id = data.id
  hash = data.hash

  //target hash
  realhash = sha256(id+pwd)

  //checks if user exists and pwd is correct
  if ((realhash == hash) && (users.includes(id) || temp_no_del == id)){
    //if there are too many ppl it blocks axcess
    if(no_pwd_users>1){
      res.send("TOOOOOO MANY PPL THUS YOU SHALL NOT PASS")
    }
    //if all is correct allows acess
    else{
      res.sendFile(path.join(__dirname, '/public/home/home.html'));
      temp_no_del = toString(Math.random()*100000000000)
    }
    //if pwd is wrong
  } else{
    res.send("FAIL!")
  }
});

//starts server
var server = app.listen(port);
console.log('Server started at http://localhost:' + port);

//io start
io = socket(server)


//removes an element from an array
function arrayRemove(arr, value) {
 
   return arr.filter(function(geeks){
       return geeks != value;
   });
 
}

//sleeps
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

//gets the suburl
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
  //adds id to list of ids
  users.push(socket.id)

  //runs socketmodule
  run_socket(socket)

  //increments number of users
  if (get_suburl(socket.handshake.headers.referer) == "home"){
    no_pwd_users += 1
  }

  //if a user leaves the site
  socket.on('disconnect', function(){
    console.log(socket.id+":- Left the site")

    //removes the user
    users = arrayRemove(users, socket.id)
    temp_no_del = socket.id
    
    //decremtents number of users
    if (get_suburl(socket.handshake.headers.referer) == "home"){
    no_pwd_users -= 1
  }
  })
})

