const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("beep").setDescription("Beep Boop!"),
  async execute(interaction) {
    await interaction.reply("Boop! 🤖");
  },
};
