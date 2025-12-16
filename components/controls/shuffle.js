const { MessageFlags } = require("discord.js");

module.exports = {
  data: {
    name: "shuffle",
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

    client.distube.shuffle(interaction);
    await interaction.reply({
      content: "🔀 Shuffle queue",
      flags: MessageFlags.Ephemeral,
    });
  },
};
