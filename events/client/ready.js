const { REST } = require("@discordjs/rest");
const { Routes } = require("discord.js");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.log(`${client.user.username} is Online!`);

    client.user.setPresence({
      activities: [
        {
          name: "tag me",
          type: 2,
        },
      ],
      status: "idle",
    });

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
  },
};
