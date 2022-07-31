const Discord = require("discord.js");

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName("ping")
    .setDescription("Run this to measure my ping."),
  async execute(interaction, client) {
    const embed = new Discord.EmbedBuilder()
      .setColor("#38761D")
      .setTimestamp()
      .setTitle("🏓 ╎ Pong!")
      .setDescription(
        `🏠 ╎ Websocket Latency: ${client.ws.ping}ms
        🤖 ╎ Bot Latency: ${Date.now() - interaction.createdTimestamp}ms`
      );
    await interaction.reply({ embeds: [embed] });
  },
};
