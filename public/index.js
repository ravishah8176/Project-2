const socket = io();

var messageToClient;
const button = document.getElementById("button");
socket.on("message", (message) => {
  messageToClient = message;
  console.log(messageToClient);
});

// Message
