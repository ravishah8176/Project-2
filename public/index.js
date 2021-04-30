const socket = io();

const button1 = document.querySelector(".textData-1");
const button2 = document.querySelector(".textData-2");

socket.on("message", (message) => {
  document.getElementById("textDataIo-1").innerHTML = message;
});

socket.on("message", (message) => {
  var a = 0;
  if (a === 0) {
    button2.addEventListener("click", () => {
      document.getElementById("textDataIo-2").innerHTML = message;
      // a = a + 1;
    });
  }
});
