const fs = require("fs");

module.exports = (client, Discord) => {
  const load_dir = (categories) => {
    const event_files = fs
      .readdirSync(`./events/${categories}`)
      .filter((file) => file.endsWith(".js"));

    for (const file of event_files) {
      const event = require(`../events/${categories}/${file}`);
      const event_name = file.split(".")[0];
      client.on(event_name, event.bind(null, Discord, client));
    }
  };

  ["client", "guild"].forEach((e) => load_dir(e));
};
