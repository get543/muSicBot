const express = require("express");
const server = express();
const now = new Date();

server.all(`/`, (req, res) => {
  res.send(`Result: [OK].`);
});

function keepAlive() {
  server.listen(3000, () => {
    console.log(
      `Server is now ready! | ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
    );
  });
}

module.exports = keepAlive;
