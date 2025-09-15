const Discord = require("discord.js");

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName("controls")
    .setDescription(
      "Show music control. You can resume, pause, skip, stop, shuffle and a lot more."
    ),
  async execute(interaction, client) {
    if (!interaction.member.voice.channel) {
      return interaction.reply({
        content: "Sorry, you must join a voice channel before using this command.",
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

    // Defer the reply immediately to prevent timeout
    await interaction.deferReply({ ephemeral: true });

    const actualSeek = queue.formattedCurrentTime;
    const finalTotal = song.formattedDuration;

    const npEmbed = new Discord.EmbedBuilder()
      .setColor(0x6495ed)
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

    // Buttons
    let Buttons = [];

    Buttons[0] = new Discord.ButtonBuilder()
      .setEmoji("▶️")
      .setCustomId("resume")
      .setStyle(Discord.ButtonStyle.Primary);

    Buttons[1] = new Discord.ButtonBuilder()
      .setEmoji("⏸")
      .setCustomId("pause")
      .setStyle(Discord.ButtonStyle.Primary);

    Buttons[2] = new Discord.ButtonBuilder()
      .setEmoji("⏹️")
      .setCustomId("stop")
      .setStyle(Discord.ButtonStyle.Primary);

    Buttons[3] = new Discord.ButtonBuilder()
      .setEmoji("🔀")
      .setCustomId("shuffle")
      .setStyle(Discord.ButtonStyle.Primary);

    Buttons[4] = new Discord.ButtonBuilder()
      .setEmoji("⏭️")
      .setCustomId("skip")
      .setStyle(Discord.ButtonStyle.Primary);

    const message = await interaction.editReply({
      embeds: [npEmbed],
      components: [new Discord.ActionRowBuilder().addComponents(Buttons)],
      fetchReply: true,
      fetchEdit: true,
    });

    module.exports = message;
  },
};
