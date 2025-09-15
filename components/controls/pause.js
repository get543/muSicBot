module.exports = {
  data: {
    name: "pause",
  },
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
      });
    }

    if (queue.paused) {
      return interaction.reply({ content: "The music is currently paused.", ephemeral: true });
    }

    client.distube.pause(interaction);
    await interaction.reply({ content: "⏸ Music paused", ephemeral: true });
  },
};
