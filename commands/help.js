module.exports = {
    name: 'help',
    aliases: ['command', 'cmd', 'commands'],
    description: "Send a help command",
    async execute(client, message, args, cmd, Discord) {
        message.channel.send('list commandnya gw taro di sini ges https://sourceb.in/FGPjCH2mDl');
    }
}