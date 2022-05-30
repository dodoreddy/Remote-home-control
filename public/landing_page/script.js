socket = io.connect("https://test-website.dodo135.repl.co")

button = document.getElementById("btn");
pwd = document.getElementById("pasword")
console.log(document.getElementById('btn'))

button.addEventListener('click', function() {
  socket.emit('pwd', pwd.value);
})