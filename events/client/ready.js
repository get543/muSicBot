module.exports = (Discord, client, message) => {
  console.log(`${client.user.username} is Online!`);

  client.user.setPresence({
    activity: {
      name: "tag me",
      type: "LISTENING",
    },
    status: "idle",
  });
};
