socket = io.connect("https://test-website.dodo135.repl.co")

sessionStorage.clear()

button = document.getElementById("btn");
pwd = document.getElementById("pasword")
console.log(document.getElementById('btn'))

button.addEventListener('click', function() {
  socket.emit('pwd', pwd.value);
  sessionStorage.setItem("pwd", pwd.value);
  window.location.href = ("http://localhost:3000/home");
})


socket.on('id', function(data){
  console.log(data);
  sessionStorage.setItem("id", data)
})