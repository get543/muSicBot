const Discord = require("discord.js");
const { DisTube } = require("distube");

const { SoundCloudPlugin } = require("@distube/soundcloud");
const { SpotifyPlugin } = require("@distube/spotify");
const { YtDlpPlugin } = require("@distube/yt-dlp");

module.exports = async (client) => {
  client.distube = new DisTube(client, {
    searchSongs: 0,
    emitNewSongOnly: true,
    leaveOnFinish: true,
    emitAddSongWhenCreatingQueue: false,
    emitAddListWhenCreatingQueue: false,
    nsfw: true,
    ytdlOptions: {
      quality: "highestaudio",
      filter: "audioonly",
    },
    plugins: [
      new SpotifyPlugin({ emitEventsAfterFetching: true }),
      new SoundCloudPlugin(),
      new YtDlpPlugin({ update: true }),
    ],
  });

  client.distube
    .on("playSong", (queue, song) => {
      queue.textChannel.send(`🎵  Playing ***${song.name}***  🎵`);
    })

    .on("addSong", (queue, song) => {
      queue.textChannel.send(
        `Added **${song.name}** - \`${song.formattedDuration}\` to the queue`
      );
    })

    // !does not work atm
    // .on("addList", (queue, playlist) => {
    //   const playlistEmbed = new Discord.EmbedBuilder()
    //     .setAuthor({ text: "Added Playlist" })
    //     .setTitle(playlist.name)
    //     .setURL(playlist.url)
    //     .setColor(0x7FFF00)
    //     .setThumbnail(playlist.thumbnail)
    //     .setTimestamp()
    //     .setFooter({
    //       text: `Requested by: ${playlist.user.username}`,
    //     });
    //   queue.textChannel.send(playlistEmbed);
    // })

    .on("error", (channel, e) => {
      const errEmbed = new Discord.EmbedBuilder()
        .setTitle("An Error Encountered")
        .setColor(0xf83c14)
        .setDescription(e.toString().slice(0, 1974))
        .setTimestamp();
      channel.send(errEmbed);
      console.error(e);
    })

    .on("finish", (queue) => {
      queue.textChannel.send(
        `Yey I've finnished the queue. Leaving the voice channel 😥`
      );
    })

    .on("empty", (queue) =>
      queue.textChannel.send(`Channel is empty, so I'm Leaving.. 😢`)
    );
};
