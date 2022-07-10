const keepAlive = require("./server");
const Discord = require("discord.js");
require("dotenv").config();
const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });

client.commands = new Discord.Collection();
client.events = new Discord.Collection();
client.queue = new Map();

["command_handler", "event_handler"].forEach((handler) => {
  require(`./handlers/${handler}`)(client, Discord);
});

client.login(process.env.DISCORD_TOKEN);

keepAlive();
