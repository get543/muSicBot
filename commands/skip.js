module.exports = {
    name: 'skip',
    aliases: ['s', 'sk'],
    description: 'Skip currently playing music',
    async execute(client, message, args, cmd, Discord) {

        // Checking permissions
        const voice_channel = message.member.voice.channel;
        if (!voice_channel) return message.channel.send('Harus ada di voice channel dulu baru bisa 😛');
        const permissions = voice_channel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.channel.send('Cek permission lagi, gak dikasih ijin lu');
        if (!permissions.has('SPEAK')) return message.channel.send('Cek permission lagi, gak dikasih ijin lu');

        const server_queue = client.queue.get(message.guild.id);

        const skip_song = (message, server_queue) => {
            if (!message.member.voice.channel) return message.channel.send('Harus ada di voice channel dulu baru bisa 😛');
            if(!server_queue) {
                return message.channel.send(`There are no songs in queue 😔`);
            }
            server_queue.connection.dispatcher.end();
        }
        
        skip_song(message, server_queue);
    }
}
