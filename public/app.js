var socket = io();
var nickname = prompt("Enter your nickname");
var uuid = Date.now().toString() + Math.round(Math.random() * 100).toString();
console.log(uuid);

socket.on("message", function (message) {
  console.log(message);
  var messageEle = document.createElement("div");
  var messageInner =
    "<span class='actor'>" + message.nickname + ":</span> " + message.text;
  messageEle.innerHTML = messageInner;
  var classes = "message";
  if (message.uuid === uuid) {
    classes = classes + "me";
  }
  messageEle.className = classes;
  document.querySelector(".message").appendChild(messageEle);
});

document.querySelector(".text").addEventListener("keyup", function (e) {
  if (e.keyCode !== 13) return;
  if (!e.target.value.trim()) return;
  console.log(e.target.value);
  socket.emit("message", {
    text: e.target.value,
    uuid: uuid,
    nickname: nickname,
  });
  e.target.value = "";
});
