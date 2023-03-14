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
        `👍 Added **${song.name}** - \`${song.formattedDuration}\` to the queue 👍`
      );
    })

    .on("addList", (queue, playlist) => {
      queue.textChannel.send(
        `👍 Added playlist **${playlist.name}** - \`${playlist.formattedDuration}\` to the queue 👍`
      );
    })

    .on("error", (channel, e) => {
      channel.send("**An Error Encountered** \n", e.toString().slice(0, 1974));
      console.error(e);
    })

    .on("finish", (queue) => {
      queue.textChannel.send("Yay I've finnished the queue 😊. Leaving the voice channel 😥");
    })

    .on("empty", (queue) => queue.textChannel.send("Channel is empty, so I'm Leaving.. 😢"));
};
