const express = require("express");
const server = express();

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  // Construct the formatted string, omitting 0 values for larger units
  let parts = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  parts.push(`${seconds}s`);

  return parts.join(" ");
}

function keepAlive(client) {
  server.all("/", (req, res) => {
    // Get real-time status data from the client object
    const botPing = client.ws.ping; // Latency to the Discord Gateway
    const botUptime = formatTime(client.uptime); // Bot Uptime in readable format
    const currentTime = new Date().toLocaleTimeString("en-US", { hour12: false }); // Server's current time

    // Start the HTML structure
    let htmlContent = `
      <html>
        <head>
          <title>Bot Status: ${client.user.tag}</title>
          <style>
            body { font-family: sans-serif; background-color: #2c2f33; color: #ffffff; padding: 20px; }
            h1 { color: #5865F2; }
            h3 { border-bottom: 1px solid #4f545c; padding-bottom: 5px; }
            .status-box { background-color: #23272a; padding: 15px; margin-bottom: 20px; border-radius: 8px; }
            .status-item { margin-bottom: 8px; }
            .status-label { font-weight: bold; color: #99aab5; margin-right: 10px; }
            .command-box { background-color: #23272a; padding: 15px; margin-bottom: 10px; border-radius: 8px; border-left: 5px solid #5865F2; }
            .cmd-name { font-weight: bold; font-size: 1.1em; color: #00b0f4; }
            .cmd-desc { color: #99aab5; margin-left: 10px; }
            .ping-good { color: #43b581; } /* Green for low ping */
            .ping-warn { color: #faa61a; } /* Yellow for moderate ping */
            .ping-bad { color: #f04747; } /* Red for high ping */
          </style>
        </head>
        <body>
          <h1>🟢 ${client.user.tag} Status</h1>
          
          <div class="status-box">
            <h3>📊 Real-Time Metrics</h3>
            <div class="status-item">
              <span class="status-label">Uptime:</span>
              <span>${botUptime}</span>
            </div>
            <div class="status-item">
              <span class="status-label">Gateway Ping:</span>
              <span class="${botPing < 100 ? "ping-good" : botPing < 200 ? "ping-warn" : "ping-bad"}">${botPing}ms</span>
            </div>
             <div class="status-item">
              <span class="status-label">Server Time:</span>
              <span>${currentTime}</span>
            </div>
          </div>

          <h3>📜 Active Commands:</h3>
    `;

    // Loop through the commandArray
    if (client && client.commandArray) {
      const commands = Array.isArray(client.commandArray)
        ? client.commandArray
        : Array.from(client.commandArray.values());

      if (commands.length > 0) {
        commands.forEach((cmd) => {
          htmlContent += `
            <div class="command-box">
              <span class="cmd-name">/${cmd.name}</span>
              <span class="cmd-desc">${cmd.description}</span>
            </div>
          `;
        });
      } else {
        htmlContent += "<p>No commands loaded found.</p>";
      }
    } else {
      htmlContent += "<p>Client data not available yet.</p>";
    }

    htmlContent += "</body></html>";
    res.send(htmlContent);
  });

  // eslint-disable-next-line no-undef
  const PORT = process.env.PORT || 3000;
  const HOSTNAME = "0.0.0.0";
  server.listen(PORT, HOSTNAME, () => {
    console.log(`Web server listening on http://${HOSTNAME}:${PORT}`);
  });
}

module.exports = keepAlive;
