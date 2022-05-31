socket = io.connect("http://localhost:3000")

sessionStorage.clear()

button = document.getElementById("btn");
pwd = document.getElementById("pasword")
console.log(document.getElementById('btn'))

button.addEventListener('click', function() {
  socket.emit('pwd', pwd.value);
  sessionStorage.setItem("pwd", pwd.value);
  id = sessionStorage.getItem("id");
  hash = sha256(id+pwd.value)
  window.location.href = ("http://localhost:3000/home?id="+id+"&hash="+hash);
})


socket.on('id', function(data){
  console.log(data);
  sessionStorage.setItem("id", data)
})