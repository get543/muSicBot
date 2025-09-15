// NOT WORKING AS INTENDED
const Discord = require("discord.js");
const { message } = require("../../commands/music/controls");

module.exports = {
  data: {
    name: "skip",
  },
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
        ephemeral: true,
      });
    }

    const next_song = queue.songs[1];
    if (!next_song) {
      return interaction.reply({
        content: "There is no next song to skip to 😢",
        ephemeral: true,
      });
    }

    client.distube.skip(interaction);

    const actualSeek = queue.formattedCurrentTime;
    const finalTotal = next_song.formattedDuration;

    const npEmbed = new Discord.EmbedBuilder()
      .setColor(0x6495ed)
      .setAuthor({ name: "🎵 Now Playing 🎵" })
      .setTitle(next_song.name)
      .setURL(next_song.url)
      .setThumbnail(next_song.thumbnail)
      .setDescription(`${actualSeek} / ${finalTotal}`)
      .setTimestamp()
      .setFooter({
        text: `Requested by: ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL(),
      });

    return message.edit({
      content: "⏭ Skipped",
      embeds: [npEmbed],
      ephemeral: true,
    });
  },
};
