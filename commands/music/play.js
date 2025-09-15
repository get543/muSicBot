const Discord = require("discord.js");

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName("play")
    .setDescription("Play music, supports YouTube, Spotify, and SoundCloud.")
    .addStringOption((option) =>
      option
        .setName("query")
        .setDescription("Put a keyword or link to the music that you want to play.")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    if (!interaction.member?.voice?.channel) {
      return interaction.reply({
        content: "Sorry, you must join a voice channel before using this command.",
        ephemeral: true,
      });
    }

    const music = interaction.options.getString("query");

    try {
      // Defer the reply immediately to prevent timeout
      await interaction.deferReply({ ephemeral: true });

      client.distube.play(interaction.member?.voice?.channel, music, {
        textChannel: interaction.channel,
        member: interaction.member,
        metadata: { interaction },
      });

      // Edit the deferred reply
      await interaction.editReply({
        content: "🔃 Loading...",
      });
    } catch (error) {
      console.error("Music Play Error: ", error);

      // More specific error handling
      if (error.name === "DisTubeError") {
        if (error.message.includes("NO_RESULT")) {
          return interaction.editReply({
            content: "Could not find any music with that query. Try another search term.",
          });
        }

        if (error.message.includes("Unsupported URL")) {
          return interaction.editReply({
            content: "Sorry, this link is not supported. Try a YouTube or Spotify link.",
          });
        }
      }

      // Generic error handling
      return interaction.editReply({
        content: "Oops, there was an error playing the music. Please try again.",
      });
    }
  },
};
