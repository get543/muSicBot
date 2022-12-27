const Discord = require("discord.js");

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName("stop")
    .setDescription("Stop playing music and leave the voice channel."),
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

    client.distube.stop(interaction);
    return interaction.reply({
      content: "⏹ Stop playing music 👋 Leaving voice channel.",
    });
  },
};
