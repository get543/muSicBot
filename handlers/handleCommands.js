const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord.js");

module.exports = (client) => {
  client.handleCommands = async (commandFolders) => {
    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`./commands/${folder}`)
        .filter((file) => file.endsWith(".js"));

      for (const file of commandFiles) {
        const command = require(`../commands/${folder}/${file}`);
        // Set a new item in the Collection
        // With the key as the command name and the value as the exported module
        client.commandArray.push(command.data.toJSON());
        client.commands.set(command.data.name, command);
        console.table([
          {
            "Command Name": command.data.name,
            "Command Description": command.data.description,
          },
        ]);
      }
    }

    const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

    if (process.env.guildID) {
      (async () => {
        try {
          console.log("Registering guild application (/) commands.");

          await rest.put(
            Routes.applicationGuildCommands(process.env.clientID, process.env.guildID),
            {
              body: client.commandArray,
            }
          );

          console.log("Successfully registered guild application (/) commands.");
        } catch (error) {
          console.error(error);
        }
      })();
    } else {
      (async () => {
        try {
          console.log("Registering global application (/) commands.");

          await rest.put(Routes.applicationCommands(process.env.clientID), {
            body: client.commandArray,
          });

          console.log("Successfully registered global application (/) commands.");
        } catch (error) {
          console.error(error);
        }
      })();
    }
  };
};
