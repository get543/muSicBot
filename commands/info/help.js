const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("List all available SicBot commands.")
    .addStringOption((option) =>
      option
        .setName("category")
        .setDescription("What category of the help command ?")
        .setRequired(true)
        .addChoices(
          { name: "other", value: "other_commands" },
          { name: "music", value: "music_commands" }
        )
    ),
  async execute(interaction) {
    if (interaction.options.getString("category") === "other_commands") {
      const embed = new EmbedBuilder()
        .setTitle("***Help*** 😭")
        .setURL("https://youtu.be/Oqrm-9Wy8iU")
        .setAuthor({
          name: "Created By : Udin",
          iconURL: "https://cf.shopee.co.id/file/e75559dfb6f7fb15db4873b5b760abb4",
          url: "https://cf.shopee.co.id/file/e75559dfb6f7fb15db4873b5b760abb4",
        })
        .setDescription(
          "The code is on github [this](https://github.com/get543/muSicBot) page. \nYou can also host it yourself."
        )
        .setColor(0xf6441d)
        .addFields([
          { name: "/ping", value: "pong" },
          { name: "/hai", value: "say hai to the bot" },
          { name: "/beep", value: "beep boop robot" },
          { name: "/echo", value: "send the message the same as you typed in" },
          { name: "/help", value: "show this command" },
        ])
        .setTimestamp()
        .setFooter({
          text: `Requested by: ${interaction.user.username}`,
          iconURL: interaction.user.displayAvatarURL(),
        });

      let Buttons = [];

      Buttons[0] = new ButtonBuilder()
        .setLabel("My Github Page!")
        .setStyle(ButtonStyle.Link)
        .setURL("https://github.com/get543");

      Buttons[1] = new ButtonBuilder()
        .setEmoji("😁")
        .setCustomId("troll")
        .setStyle(ButtonStyle.Danger);

      await interaction.reply({
        embeds: [embed],
        components: [new ActionRowBuilder().addComponents(Buttons)],
      });
    } else if (interaction.options.getString("category") === "music_commands") {
      const musicEmbed = new EmbedBuilder()
        .setTitle("***Music Command*** 🎵")
        .setURL("https://youtu.be/Oqrm-9Wy8iU")
        .setAuthor({
          name: "Created By : Udin",
          iconURL: "https://cf.shopee.co.id/file/e75559dfb6f7fb15db4873b5b760abb4",
          url: "https://cf.shopee.co.id/file/e75559dfb6f7fb15db4873b5b760abb4",
        })
        .setDescription("Here are the list of music commands")
        .setColor(0xf08080)
        .addFields([
          {
            name: "/autoplay",
            value: "Turn autoplay on or off. Default to off.",
          },
          { name: "/loop", value: "Repeat song, queue or disable it." },
          { name: "/nowplaying", value: "Show what music is being played." },
          { name: "/pause", value: "Pause playing music." },
          {
            name: "/play",
            value: "Play music, supports YouTube, Spotify, and SoundCloud.",
          },
          {
            name: "/queue",
            value: "Show the queue of what music is playing next.",
          },
          { name: "/resume", value: "Resume paused music." },
          { name: "/seek", value: "Fast forward current playing music." },
          { name: "/shuffle", value: "Shuffle current queue." },
          {
            name: "/skip",
            value: "Skip now playing music to the next one on the queue.",
          },
          {
            name: "/stop",
            value: "Stop playing music and leave the voice channel.",
          },
        ])
        .setTimestamp()
        .setFooter({
          text: `Requested by: ${interaction.user.username}`,
          iconURL: interaction.user.displayAvatarURL(),
        });

      await interaction.reply({ embeds: [musicEmbed] });
    }
  },
};
