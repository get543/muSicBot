module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);

      if (!command) return;

      try {
        await command.execute(interaction, client);
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      }
    } else if (interaction.isButton()) {
      const button = client.buttons.get(interaction.customId);
      if (!button) return new Error("There is no button that match that command.");

      try {
        await button.execute(interaction, client);
      } catch (error) {
        console.error(error);
      }
    }
  },
};
