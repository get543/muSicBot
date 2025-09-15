module.exports = {
  data: {
    name: "stop",
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

    client.distube.stop(interaction);
    await interaction.reply({
      content: "⏹ Stop playing music 👋 Leaving voice channel.",
      ephemeral: true,
    });
  },
};
