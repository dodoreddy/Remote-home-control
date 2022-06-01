run_socket = function(socket){
  website = socket.handshake.headers.referer
  console.log("Made a connection:- "+socket.id)
  suburl = get_suburl(website)

  if(suburl == '/'){
    io.to(socket.id).emit('id', socket.id)
  } else if('home'){
  }
}

module.exports = run_socket

get_suburl = function(url){
    regex = /(?<=(.+\/\/.*\/)).+(?=\/)/g
    suburl = regex.exec(url)
    if (suburl != null){
      return suburl[0]
    }
    return "/"
}