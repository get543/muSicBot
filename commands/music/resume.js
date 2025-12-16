const { SlashCommandBuilder, MessageFlags } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("resume").setDescription("Resume paused music."),
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
      });
    }

    if (!queue.paused) {
      return interaction.reply({
        content: "The music is currently playing.",
        flags: MessageFlags.Ephemeral,
      });
    }

    await client.distube.resume(interaction);
    return interaction.reply({ content: "▶ Playing music" });
  },
};
