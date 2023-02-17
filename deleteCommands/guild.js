require("dotenv").config();
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord.js");

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log("Deleting guild application (/) commands.");

    await rest.put(Routes.applicationGuildCommands(process.env.clientID, process.env.guildID), {
      body: [],
    });

    console.log("Successfully deleted guild application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();
