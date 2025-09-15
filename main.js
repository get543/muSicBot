/* eslint-disable no-undef */
const keepAlive = require("./server");
require("dotenv").config();
const fs = require("fs");
const Discord = require("discord.js");

const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.GuildVoiceStates,
    Discord.GatewayIntentBits.MessageContent,
    Discord.GatewayIntentBits.GuildMessageReactions,
  ],
  partials: [Discord.Partials.Message, Discord.Partials.Channel, Discord.Partials.Reaction],
});

client.commands = new Discord.Collection();
client.buttons = new Discord.Collection();
client.commandArray = [];

const handlers = fs.readdirSync("./handlers").filter((file) => file.endsWith(".js"));
const eventFolders = fs.readdirSync("./events");
const commandFolders = fs.readdirSync("./commands");
const componentFolders = fs.readdirSync("./components");

(async () => {
  for (const file of handlers) {
    require(`./handlers/${file}`)(client);
  }

  client.handleEvents(eventFolders, "./events");
  client.handleCommands(commandFolders, "./commands");
  client.handleComponents(componentFolders, "./components");
  client.login(process.env.DISCORD_TOKEN);
})();

keepAlive();
