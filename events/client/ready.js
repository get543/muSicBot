module.exports = (Discord, client, message) => {
    console.log(`${client.user.username} is Online!`);

    client.user.setPresence({
        activity: { 
            name: 'tag me',
            type: 'LISTENING'
        },
        status: 'idle'
    })

    client.on('message', message => {
        // jika bot di mention
        if (message.mentions.has('830398358719954944')) {
            message.channel.send(`ini prefix gw ***?***  oke`);
        };

        // message content
        const sip = ["oke", "ok", "og", "oge", "okay"];
        
        if (sip.includes(message.content.toLowerCase())) {
            message.channel.send('Sip 👍');
        }
    });
}