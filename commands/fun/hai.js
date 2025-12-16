const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("hai").setDescription("Just say hay and it'll respond."),
  async execute(interaction) {
    await interaction.reply("Hello 🤗");
  },
};
