const express = require("express");
const server = express();
const d = new Date();

server.all(`/`, (req, res) => {
  res.send(`Result: [OK].`);
});

function keepAlive() {
  server.listen(3000, () => {
    console.log(`Server is now ready! | ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`);
  });
}

module.exports = keepAlive;
