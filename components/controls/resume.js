const { MessageFlags } = require("discord.js");

module.exports = {
  data: {
    name: "resume",
  },
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

    if (queue.playing) {
      return interaction.reply({
        content: "The music is currently playing.",
        flags: MessageFlags.Ephemeral,
      });
    }

    client.distube.resume(interaction);
    await interaction.reply({
      content: "▶ Playing music",
      flags: MessageFlags.Ephemeral,
    });
  },
};
