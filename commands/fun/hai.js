const Discord = require("discord.js");

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName("hai")
    .setDescription("Just say hay and it'll respond."),
  async execute(interaction) {
    await interaction.reply("Hello 🤗");
  },
};
