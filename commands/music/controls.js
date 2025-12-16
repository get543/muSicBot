const {
  SlashCommandBuilder,
  MessageFlags,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("controls")
    .setDescription(
      "Show music control. You can resume, pause, skip, stop, shuffle and a lot more."
    ),
  async execute(interaction, client) {
    if (!interaction.member.voice.channel) {
      return interaction.reply({
        content: "Sorry, you must join a voice channel before using this command.",
        flags: MessageFlags.Ephemeral,
      });
    }

    const queue = client.distube.getQueue(interaction);
    if (!queue) {
      return interaction.reply({
        content: "No Music Is Being Played.",
        flags: MessageFlags.Ephemeral,
      });
    }

    const song = queue.songs[0];
    if (!song) {
      return interaction.reply({
        content: "No Music Is Being Played.",
        flags: MessageFlags.Ephemeral,
      });
    }

    // Defer the reply immediately to prevent timeout
    await interaction.deferReply({ flags: MessageFlags.Ephemeral });

    const actualSeek = queue.formattedCurrentTime;
    const finalTotal = song.formattedDuration;

    const npEmbed = new EmbedBuilder()
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

    Buttons[0] = new ButtonBuilder()
      .setEmoji("▶️")
      .setCustomId("resume")
      .setStyle(ButtonStyle.Primary);

    Buttons[1] = new ButtonBuilder()
      .setEmoji("⏸")
      .setCustomId("pause")
      .setStyle(ButtonStyle.Primary);

    Buttons[2] = new ButtonBuilder()
      .setEmoji("⏹️")
      .setCustomId("stop")
      .setStyle(ButtonStyle.Primary);

    Buttons[3] = new ButtonBuilder()
      .setEmoji("🔀")
      .setCustomId("shuffle")
      .setStyle(ButtonStyle.Primary);

    Buttons[4] = new ButtonBuilder()
      .setEmoji("⏭️")
      .setCustomId("skip")
      .setStyle(ButtonStyle.Primary);

    const message = await interaction.editReply({
      embeds: [npEmbed],
      components: [new ActionRowBuilder().addComponents(Buttons)],
      fetchReply: true,
      fetchEdit: true,
    });

    module.exports = message;
  },
};
