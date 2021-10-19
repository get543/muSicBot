module.exports = {
    name: 'stop',
    aliases: ['st', 'dc', 'leave'],
    description: 'Stop playing music and leave the voice channel',
    async execute(client, message, args, cmd, Discord) {

        // Checking permissions
        const voice_channel = message.member.voice.channel;
        if (!voice_channel) return message.channel.send('Harus ada di voice channel dulu baru bisa 😛');
        const permissions = voice_channel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.channel.send('Cek permission lagi, gak dikasih ijin lu');
        if (!permissions.has('SPEAK')) return message.channel.send('Cek permission lagi, gak dikasih ijin lu');

        const server_queue = client.queue.get(message.guild.id);

        const stop_song = (message, server_queue) => {
            if (!message.member.voice.channel) return message.channel.send('Harus ada di voice channel dulu baru bisa 😛');
            server_queue.songs = [];
            server_queue.connection.dispatcher.end();
            message.channel.send('Stopping and Leaving the Voice Channel.. 😥');
        }
        
        stop_song(message, server_queue);
    }
}
