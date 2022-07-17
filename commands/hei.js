module.exports = {
  name: "hei",
  aliases: ["hay", "hey", "hai", "hello"],
  description: "say hello command",
  execute(client, message, args, cmd, Discord) {
    message.channel.send(`oke masih gw pantau 😑`);
  },
};
