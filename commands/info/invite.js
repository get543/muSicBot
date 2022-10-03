const Discord = require("discord.js");

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName("invite")
    .setDescription("Invite this bot into the server of your choosing."),
  async execute(interaction) {
    const embed = new Discord.EmbedBuilder()
      .setTitle("Click Me to Invite")
      .setURL(
        `https://discord.com/oauth2/authorize?client_id=830398358719954944&permissions=139690576960&scope=applications.commands%20bot`
      );
    await interaction.reply({ embeds: [embed] });
  },
};
