module.exports = (Discord, client, message) => {
    console.log(`GemBot is Online!`);

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
        if (message.content.toLowerCase() == 'oke') {
            message.channel.send('Sip 👍');
        } else if (message.content.toLowerCase() == 'ok') {
            message.channel.send('Sip 👍');
        } else if (message.content.toLowerCase() == 'og') {
            message.channel.send('Sip 👍');
        } else if (message.content.toLowerCase() == 'oge') {
            message.channel.send('Sip 👍');
        } else if (message.content.toLowerCase() == 'okay') {
            message.channel.send('Sip 👍');
        };
    });
}