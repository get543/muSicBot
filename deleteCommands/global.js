require("dotenv").config();
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord.js");

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log("Deleting global application (/) commands.");

    await rest.put(Routes.applicationCommands(process.env.clientID), {
      body: [],
    });

    console.log("Successfully deleted global application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();
