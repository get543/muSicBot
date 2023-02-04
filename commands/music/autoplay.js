const Discord = require("discord.js");

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName("autoplay")
    .setDescription("Turn autoplay on or off. Default to off."),
  async execute(interaction, client) {
    if (!interaction.member.voice.channel) {
      return interaction.reply({
        content: "Sorry, you must join a voice channel before using this command.",
        ephemeral: true,
      });
    }

    const queue = await client.distube.getQueue(interaction);
    if (!queue) {
      return interaction.reply({
        content: "Queue is empty! 📪",
        ephemeral: true,
      });
    }

    let mode = client.distube.toggleAutoplay(interaction);

    return interaction.reply({
      content: "Set autoplay mode to `" + (mode ? "On" : "Off") + "`",
    });
  },
};
