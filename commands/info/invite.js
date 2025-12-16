const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("invite")
    .setDescription("Invite this bot into the server of your choosing."),
  async execute(interaction) {
    let Buttons = [];

    Buttons[0] = new ButtonBuilder()
      .setLabel("Click to invite me to your server !")
      .setStyle(ButtonStyle.Link)
      .setURL(
        "https://discord.com/oauth2/authorize?client_id=830398358719954944&permissions=139690576960&scope=applications.commands%20bot"
      );
    await interaction.reply({
      components: [new ActionRowBuilder().addComponents(Buttons)],
    });
  },
};
