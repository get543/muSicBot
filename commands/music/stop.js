const Discord = require("discord.js");

module.exports = {
  data: new Discord.SlashCommandBuilder().setName("stop").setDescription("Stop playing music."),
  async execute(interaction, client) {
    if (!interaction.member.voice.channel) {
      return interaction.reply({
        content: "Sorry, you must join a voice channel before using this command.",
        ephemeral: true,
      });
    }

    const queue = await client.distube.getQueue(interaction);

    await client.distube.stop(interaction);

    if (queue.voice) {
      queue.voice.leave();
    }

    interaction.reply({
      content: "⏹ Stop playing music.",
    });
  },
};
