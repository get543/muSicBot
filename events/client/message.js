module.exports = (Discord, client, message) => {
  // exclude @here dan @everyone
  if (
    message.content.includes("@here") ||
    message.content.includes("@everyone")
  )
    return false;

  // bot got mentioned
  if (message.mentions.has("830398358719954944")) {
    message.channel.send(`ini prefix gw ***?***  oke`);
  }

  // message content
  const sip = ["oke", "ok", "og", "oge", "okay"];

  if (sip.includes(message.content.toLowerCase())) {
    message.channel.send("Sip 👍");
  }
};
