const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("echo")
    .setDescription("Replies the same as what you typed in.")
    .addStringOption((option) =>
      option.setName("message").setDescription("The message to echo ?").setRequired(true)
    ),
  async execute(interaction) {
    await interaction.reply({
      content: interaction.options.getString("message"),
    });
  },
};
