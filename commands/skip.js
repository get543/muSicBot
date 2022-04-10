module.exports = {
    name: 'skip',
    aliases: ['s', 'sk'],
    description: 'Skip currently playing music',
    async execute(client, message, args, cmd, Discord) {
        // Checking permissions
        const voice_channel = message.member.voice.channel;
        if (!voice_channel) return message.channel.send('You need to be in a voice channel to use that command 😛');

        const permissions = voice_channel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.channel.send('The bot doesn\'t have the permission to `connect` in a voice channel');
        if (!permissions.has('SPEAK')) return message.channel.send('The bot doesn\'t have the permission to `speak` in a voice channel');

        const server_queue = client.queue.get(message.guild.id);

        const skip_song = (message, server_queue) => {
            if (!message.member.voice.channel) return message.channel.send('You need to be in a voice channel to use that command 😛');
            if (!server_queue) {
                return message.channel.send(`There are no songs in queue 😔`);
            }
            server_queue.connection.dispatcher.end();
        }
        
        skip_song(message, server_queue);
    }
}
