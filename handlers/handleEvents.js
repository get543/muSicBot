const fs = require("fs");

module.exports = (client) => {
  client.handleEvents = async (eventFolders) => {
    for (const folder of eventFolders) {
      const eventFiles = fs
        .readdirSync(`./events/${folder}`)
        .filter((file) => file.endsWith(".js"));

      switch (folder) {
        case "client":
          for (const file of eventFiles) {
            const event = require(`../events/${folder}/${file}`);
            if (event.once) {
              client.once(event.name, (...args) =>
                event.execute(...args, client)
              );
            } else {
              client.on(event.name, (...args) =>
                event.execute(...args, client)
              );
            }
          }
          break;

        case "distube":
          for (const file of eventFiles) {
            require(`../events/${folder}/${file}`)(client);
          }
          break;

        default:
          break;
      }
    }
  };
};
