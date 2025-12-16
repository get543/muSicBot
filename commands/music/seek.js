const { SlashCommandBuilder, MessageFlags } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("seek")
    .setDescription("Fast forward current playing music.")
    .addNumberOption((option) =>
      option
        .setName("amount")
        .setDescription("The amount of time (seconds) you want to fast forward in the music")
        .setRequired(true)
    ),
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

    const amount = interaction.options.getNumber("amount");

    client.distube.seek(interaction, amount);

    return interaction.reply({
      content: `⏩ Fast forward ${amount} seconds.`,
    });
  },
};
