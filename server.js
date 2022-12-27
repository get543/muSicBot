const express = require("express");
const server = express();
const currentDate = new Date();
const hours = ("0" + currentDate.getHours()).slice(-2);
const minutes = ("0" + currentDate.getMinutes()).slice(-2);
const seconds = ("0" + currentDate.getSeconds()).slice(-2);

server.all("/", (req, res) => {
  res.send("Result: [OK].");
});

function keepAlive() {
  server.listen(3000, () => {
    console.log(`Server is now ready! | ${hours}:${minutes}:${seconds}`);
  });
}

module.exports = keepAlive;
