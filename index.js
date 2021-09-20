const express = require("express");
const socketIo = require("socket.io");
const http = require("http");

const app = express();
const httph = http.Server(app);
const io = socketIo(httph);

app.use(express.static("./public"));

io.on("connection", (socket) => {
  console.log("A cliend connection");
  socket.on("message", (message) => {
    io.emit("message", message);
  });
  io.emit("message", {
    text: "new person joined",
    nickname: "system",
    uuid: "1",
  });
});

httph.listen(process.env.PORT || 5000, () => {
  console.log(`application port on ${process.env.PORT || 5000}`);
});
