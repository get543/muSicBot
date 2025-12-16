const { SlashCommandBuilder, MessageFlags } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("autoplay")
    .setDescription("Toggle autoplay mode. Defaults to off."),
  async execute(interaction, client) {
    if (!interaction.member.voice.channel) {
      return interaction.reply({
        content: "Sorry, you must join a voice channel before using this command.",
        flags: MessageFlags.Ephemeral,
      });
    }

    const queue = await client.distube.getQueue(interaction);
    if (!queue) {
      return interaction.reply({
        content: "Queue is empty! 📪",
        flags: MessageFlags.Ephemeral,
      });
    }

    let mode = client.distube.toggleAutoplay(interaction);

    return interaction.reply({
      content: "Set autoplay mode to `" + (mode ? "On" : "Off") + "`",
    });
  },
};
