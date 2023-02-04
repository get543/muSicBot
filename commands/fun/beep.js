const Discord = require("discord.js");

module.exports = {
  data: new Discord.SlashCommandBuilder().setName("beep").setDescription("Beep Boop!"),
  async execute(interaction) {
    await interaction.reply("Boop! 🤖");
  },
};
