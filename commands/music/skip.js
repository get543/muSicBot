const Discord = require("discord.js");

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName("skip")
    .setDescription("Skip now playing music to the next one on the queue."),
  async execute(interaction, client) {
    if (!interaction.member.voice.channel) {
      return interaction.reply({
        content:
          "Sorry, you must join a voice channel before using this command.",
        ephemeral: true,
      });
    }

    const queue = await client.distube.getQueue(interaction);
    if (!queue) {
      return interaction.reply({
        content: "Queue is empty! 📪",
      });
    }

    const next_song = queue.songs[1];
    if (!next_song) {
      return interaction.reply({
        content: "There is no next song to skip to 😢",
      });
    }

    client.distube.skip(interaction);
    return interaction.reply({ content: "⏭ Skipped" });
  },
};
