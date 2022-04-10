const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'queue',
    aliases: ['q', 'que',],
    description: 'Stop playing music and leave the voice channel',
    async execute(client, message, args, cmd, Discord) {
        // Checking permissions
        const voice_channel = message.member.voice.channel;
        if (!voice_channel) return message.channel.send('You need to be in a voice channel to use that command 😛');

        const permissions = voice_channel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.channel.send('The bot doesn\'t have the permission to `connect` in a voice channel');
        if (!permissions.has('SPEAK')) return message.channel.send('The bot doesn\'t have the permission to `speak` in a voice channel');

        const server_queue = client.queue.get(message.guild.id);
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
                    return message.channel.send("Error 😢");
                }
            });
        } catch {
            console.log();
            return message.channel.send("Another Error 😭");
        }
    }
}

// queue function
function generateQueueEmbed(message, queue) {
    const embeds = [];
    let k = 10;
    for (let i = 0; i < queue.length; i += 10) {
        const current = queue.slice(++i, ++k);
        let j = i;
        k += 10;
        const info = current.map((track) => `${j++} - [${track.title}](${track.url})`).join("\n");
        const embed = new MessageEmbed()
            .setTitle("Song Queue \n")
            .setThumbnail(message.guild.iconURL())
            .setColor("#F8AA2A")
            .setDescription(`**Current Song : \n [${queue[0].title}](${queue[0].url})**\n\n**Playing Next :**\n${info}`)
            .setTimestamp();
        embeds.push(embed);
    }
    return embeds;
}