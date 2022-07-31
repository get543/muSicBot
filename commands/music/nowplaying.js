const Discord = require("discord.js");

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName("nowplaying")
    .setDescription("Show what music is being played."),
  async execute(interaction, client) {
    if (!interaction.member.voice.channel) {
      return interaction.reply({
        content:
          "Sorry, you must join a voice channel before using this command.",
        ephemeral: true,
      });
    }

    const queue = client.distube.getQueue(interaction);
    if (!queue) {
      return interaction.reply({
        content: "No Music Is Being Played.",
        ephemeral: true,
      });
    }

    const song = queue.songs[0];
    if (!song) {
      return interaction.reply({
        content: "No Music Is Being Played.",
        ephemeral: true,
      });
    }

    try {
      const actualSeek = queue.formattedCurrentTime;
      const finalTotal = song.formattedDuration;

      const npEmbed = new Discord.EmbedBuilder()
        .setColor("#7FFF00")
        .setAuthor({ name: "🎵 Now Playing 🎵" })
        .setTitle(song.name)
        .setURL(song.url)
        .setThumbnail(song.thumbnail)
        .setDescription(`${actualSeek} / ${finalTotal}`)
        .setTimestamp()
        .setFooter({
          text: `Requested by: ${interaction.user.username}`,
          iconURL: interaction.user.displayAvatarURL(),
        });

      return interaction.reply({ embeds: [npEmbed] });
    } catch (error) {
      console.error(error);
      return interaction.reply({
        content: "Opps an error 😢 Still trying to fix it 😖.",
        ephemeral: true,
      });
    }
  },
};
