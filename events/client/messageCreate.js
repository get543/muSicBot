module.exports = {
  name: "messageCreate",
  async execute(message) {
    // exclude @here dan @everyone
    if (
      message.content.includes("@here") ||
      message.content.includes("@everyone")
    )
      return false;

    // bot got mentioned
    if (message.mentions.has("830398358719954944")) {
      message.channel.send(
<<<<<<< HEAD
        "Hello 😊 I support slash (/) commands. \nSo maybe you can start with `/help`"
=======
        "Hello 😊 I support slash (/) command. \nSo maybe you can start with `/help`"
>>>>>>> b8b56a406372fae5ecea80df890182e15b6ab611
      );
    }

    // message content
    const sip = ["oke", "ok", "og", "oge", "okay"];

    if (sip.includes(message.content.toLowerCase())) {
      message.channel.send("Sip 👍");
    }
  },
};
