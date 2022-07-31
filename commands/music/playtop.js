const Discord = require("discord.js");

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName("playtop")
    .setDescription("Add the music to the very top of the queue")
    .addStringOption((option) =>
      option
        .setName("query")
        .setDescription(
          "Put a keyword or link to the music that you want to play."
        )
        .setRequired(true)
    ),
  async execute(interaction, client) {
    if (!interaction.member.voice.channel) {
      return interaction.reply({
        content:
          "Sorry, you must join a voice channel before using this command.",
        ephemeral: true,
      });
    }

    const music = interaction.options.getString("query");

    client.distube
      .play(interaction.member.voice.channel, music, {
        textChannel: interaction.channel,
        member: interaction.member,
        interaction,
        position: 1,
      })
      .catch((err) => {
        console.error(err);
        return interaction.reply({
          content: `Oops there's an error apparently.`,
          ephemeral: true,
        });
      });

    await interaction.reply({
      content: "🔃 Loading...",
      ephemeral: true,
    });
  },
};
