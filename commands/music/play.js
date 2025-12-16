const { SlashCommandBuilder, MessageFlags } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
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
        flags: MessageFlags.Ephemeral,
      });
    }

    const music = interaction.options.getString("query");

    try {
      await interaction.deferReply({ flags: MessageFlags.Ephemeral });

      await client.distube.play(interaction.member.voice.channel, music, {
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
      if (interaction.deferred || interaction.replied) {
        return interaction.editReply({
          content: "Oops, there was an error playing the music. Please try again.",
        });
      } else {
        return interaction.reply({
          content: "Oops, there was an error playing the music. Please try again.",
          flags: MessageFlags.Ephemeral,
        });
      }
    }
  },
};
