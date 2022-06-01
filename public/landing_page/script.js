socket = io.connect("https://test-website.dodo135.repl.co")

sessionStorage.clear()

button = document.getElementById("btn");
pwd = document.getElementById("pasword")
console.log(document.getElementById('btn'))

function enter(){
  pwd_hash = sha256(pwd.value)
  sessionStorage.setItem("pwd", pwd_hash);
  id = sessionStorage.getItem("id");
  hash = sha256(id+pwd_hash)
  window.location.href = ("https://test-website.dodo135.repl.co/home?id="+id+"&hash="+hash);
}

button.addEventListener('click', function() {
  enter()
})

function keypress(e){
  var keynum;

  if(window.event) { // IE                  
    keynum = e.keyCode;
  } else if(e.which){ // Netscape/Firefox/Opera                 
    keynum = e.which;
  }

  //enter key
  if(keynum == 13){
    enter()
  };
}




socket.on('id', function(data){
  console.log(data);
  sessionStorage.setItem("id", data)
})