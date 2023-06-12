const Discord = require("discord.js");

module.exports = {
  data: new Discord.SlashCommandBuilder().setName("resume").setDescription("Resume paused music."),
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

    if (queue.playing) {
      return interaction.reply({ content: "The music is currently playing.", ephemeral: true });
    }

    client.distube.resume(interaction);
    return interaction.reply({ content: "▶ Playing music" });
  },
};
