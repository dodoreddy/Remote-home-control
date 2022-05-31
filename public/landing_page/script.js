socket = io.connect("https://test-website.dodo135.repl.co")

sessionStorage.clear()

button = document.getElementById("btn");
pwd = document.getElementById("pasword")
console.log(document.getElementById('btn'))

button.addEventListener('click', function() {
  pwd_hash = sha256(pwd.value)
  sessionStorage.setItem("pwd", pwd_hash);
  id = sessionStorage.getItem("id");
  hash = sha256(id+pwd_hash)
  window.location.href = ("https://test-website.dodo135.repl.co/home?id="+id+"&hash="+hash);
})


socket.on('id', function(data){
  console.log(data);
  sessionStorage.setItem("id", data)
})