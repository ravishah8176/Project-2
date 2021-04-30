const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const serialPort = require("serial-node");
const serialList = new serialPort().list;

const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");
const inp_out = require("console-read-write");

const serial = new serialPort();
const fs = require("fs");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = 3000 || process.env.PORT;

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

const getPortsList = async () => {
  const ports = await SerialPort.list();
  ports.forEach((port) => {
    var portInfo = {
      portPath: port.path,
      portManufacturer: port.manufacturer,
    };
    console.log("Port:", portInfo);
  });
};

var portConnect;
getPortsList().then(async () => {
  const portConnect = new SerialPort(`COM6`);
  const parser = portConnect.pipe(new Readline({ delimiter: "\n" }));

  parser.on("data", (e) => {
    fs.writeFile("analogData.txt", e, () => {});
    io.sockets.emit("message", e);
  });
});

io.on("connection", (socket) => {
  console.log(`New WS connected`);
});
// Run when clients connects
server.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

