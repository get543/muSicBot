const { DisTube } = require("distube");
const { SoundCloudPlugin } = require("@distube/soundcloud");
const { SpotifyPlugin } = require("@distube/spotify");
const { YtDlpPlugin  } = require("@distube/yt-dlp");
const { YouTubePlugin } = require("@distube/youtube");

module.exports = async (client) => {
  client.distube = new DisTube(client, {
    emitNewSongOnly: true,
    emitAddSongWhenCreatingQueue: false,
    emitAddListWhenCreatingQueue: true,
    nsfw: true,
    plugins: [ // the order you put here matters
      new YouTubePlugin(),
      new SpotifyPlugin(),
      new SoundCloudPlugin(),
      new YtDlpPlugin({ update: true })
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

    .on("error", (e, queue) => {
      queue.textChannel.send("**An Error Encountered** \n", e.toString().slice(0, 1974));
      console.error(e);
    })

    .on("finish", (queue) => {
      queue.textChannel.send("Yay I've finnished the queue 😊. Leaving the voice channel 😥");
      queue.voice.leave();
    })

    .on("empty", (queue) => {
      queue.textChannel.send("Channel is empty, so I'm Leaving.. 😢");
      queue.voice.leave();
    });
};
