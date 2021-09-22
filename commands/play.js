const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const { MessageEmbed } = require("discord.js");

//Global queue for your bot. Every server will have a key and value pair in this map. { guild.id, queue_constructor{} }
const queue = new Map();

module.exports = {
    name: 'play',
    aliases: ['p', 'skip', 's', 'stop', 'dc', 'queue', 'q'], //We are using aliases to run the skip and stop command follow this tutorial if lost: https://www.youtube.com/watch?v=QBUJ3cdofqc
    description: 'Advanced music bot',
    async execute(client, message, args, cmd, Discord) {


        //Checking for the voicechannel and permissions (you can add more permissions if you like).
        const voice_channel = message.member.voice.channel;
        if (!voice_channel) return message.channel.send('Harus ada di voice channel dulu baru bisa 😛');
        const permissions = voice_channel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.channel.send('Cek permission lagi, gak dikasih ijin lu');
        if (!permissions.has('SPEAK')) return message.channel.send('Cek permission lagi, gak dikasih ijin lu');

        //This is our server queue. We are getting this server queue from the global queue.
        const server_queue = queue.get(message.guild.id);

        //If the user has used the play command
        if (cmd === 'play'|| cmd === 'p') {
            if (!args.length) return message.channel.send('kasih keyword nya dung..');
            let song = {};

            //If the first argument is a link. Set the song object to have two keys. Title and URl.
            if (ytdl.validateURL(args[0])) {
                const song_info = await ytdl.getInfo(args[0]);
                song = { title: song_info.videoDetails.title, url: song_info.videoDetails.video_url }
            } else {
                //If there was no link, we use keywords to search for a video. Set the song object to have two keys. Title and URl.
                const video_finder = async (query) => {
                    const video_result = await ytSearch(query);
                    return (video_result.videos.length > 1) ? video_result.videos[0] : null;
                }

                const video = await video_finder(args.join(' '));
                if (video){
                    song = { title: video.title, url: video.url }
                } else {
                    message.channel.send('Error, videonya ga ketemu.');
                }
            }

            //If the server queue does not exist (which doesn't for the first video queued) then create a constructor to be added to our global queue.
            if (!server_queue) {

                const queue_constructor = {
                    voice_channel: voice_channel,
                    text_channel: message.channel,
                    connection: null,
                    songs: []
                }
                
                //Add our key and value pair into the global queue. We then use this to get our server queue.
                queue.set(message.guild.id, queue_constructor);
                queue_constructor.songs.push(song);
    
                //Establish a connection and play the song with the vide_player function.
                try {
                    const connection = await voice_channel.join();
                    queue_constructor.connection = connection;
                    video_player(message.guild, queue_constructor.songs[0]);
                } catch (err) {
                    queue.delete(message.guild.id);
                    message.channel.send('Connecting Error!');
                    throw err;
                }
            } else {
                server_queue.songs.push(song);
                return message.channel.send(`👍 **${song.title}** added to queue!`);
            }

        } 

        // queue command
        else if (cmd === 'queue' || cmd === 'q') {

            if (!server_queue) return message.channel.send("❌ **No songs currently in the queue**");

            try {
                let currentPage = 0;
                const embeds = generateQueueEmbed(message, server_queue.songs);
                const queueEmbed = await message.channel.send(`**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds[currentPage]);
                await queueEmbed.react("⬅️");
                await queueEmbed.react("⏹");
                await queueEmbed.react("➡️");

                const filter = (reaction, user) => ["⬅️", "⏹", "➡️"].includes(reaction.emoji.name) && message.author.id === user.id;
                const collector = queueEmbed.createReactionCollector(filter);

                collector.on("collect", async (reaction, user) => {
                    try {
                    if (reaction.emoji.name === "➡️") {
                        if (currentPage < embeds.length - 1) {
                            currentPage++;
                            queueEmbed.edit(`**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds[currentPage]);
                        }
                    } else if (reaction.emoji.name === "⬅️") {
                        if (currentPage !== 0) {
                            --currentPage;
                            queueEmbed.edit(`**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds[currentPage]);
                        }
                    } else {
                        collector.stop();
                        reaction.message.reactions.removeAll();
                        queueEmbed.delete();
                    }
                    await reaction.users.remove(message.author.id);
                    } catch {
                        console.log();
                        return message.channel.send("Error badjing");
                    }
                });
            } catch {
                console.log();
                return message.channel.send("Ada Error lagi badjingan");
            }
        }

        else if(cmd === 'skip' || cmd === 's') skip_song(message, server_queue);
        else if(cmd === 'stop' || cmd === 'dc') stop_song(message, server_queue);
    }
    
}

// queue function
function generateQueueEmbed(message, queue) {
    const embeds = [];
    let k = 10;
    for (let i = 0; i < queue.length; i += 10) {
        const current = queue.slice(i, k);
        let j = i;
        k += 10;
        const info = current.map((track) => `${++j} - [${track.title}](${track.url})`).join("\n\n");
        const embed = new MessageEmbed()
            .setTitle("Song Queue \n")
            .setThumbnail(message.guild.iconURL())
            .setColor("#F8AA2A")
            .setDescription(`**Current Song - [${queue[0].title}](${queue[0].url})**\n\n\n${info}`)
            .setTimestamp();
        embeds.push(embed);
    }
    return embeds;
}

const video_player = async (guild, song) => {
    const song_queue = queue.get(guild.id);

    //If no song is left in the server queue. Leave the voice channel and delete the key and value pair from the global queue.
    if (!song) {
        song_queue.voice_channel.leave();
        queue.delete(guild.id);
        return;
    }
    const stream = ytdl(song.url, { filter: 'audioonly' });
    song_queue.connection.play(stream, { seek: 0, volume: 0.5 })
    .on('finish', () => {
        song_queue.songs.shift();
        video_player(guild, song_queue.songs[0]);
    });
    await song_queue.text_channel.send(`🎶 Now playing **${song.title}**`)
}

const skip_song = (message, server_queue) => {
    if (!message.member.voice.channel) return message.channel.send('Harus ada di voice channel dulu baru bisa 😛');
    if(!server_queue) {
        return message.channel.send(`There are no songs in queue 😔`);
    }
    server_queue.connection.dispatcher.end();
}

const stop_song = (message, server_queue) => {
    if (!message.member.voice.channel) return message.channel.send('Harus ada di voice channel dulu baru bisa 😛');
    server_queue.songs = [];
    server_queue.connection.dispatcher.end();
    message.channel.send('Stopping and Leaving the Voice Channel.. 😥');
}