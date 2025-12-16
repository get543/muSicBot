const { SlashCommandBuilder, MessageFlags } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("skip")
    .setDescription("Skip now playing music to the next one on the queue."),
  async execute(interaction, client) {
    if (!interaction.member.voice.channel) {
      return interaction.reply({
        content: "Sorry, you must join a voice channel before using this command.",
        flags: MessageFlags.Ephemeral,
      });
    }

    try {
      const song = await client.distube.skip(interaction);

      if (!song) {
        return interaction.reply({
          content: "Queue is empty! 📪",
          flags: MessageFlags.Ephemeral,
        });
      }

      await interaction.reply({ content: "⏭ Skipped", flags: MessageFlags.Ephemeral });
    } catch (error) {
      console.error(error);
      return interaction.reply({ content: "**An Error Encountered**" });
    }
  },
};
