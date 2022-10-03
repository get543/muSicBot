const Discord = require("discord.js");

// queue function
function generateQueue(queue) {
  const allQueue = [];
  let k = 10;
  for (let i = 0; i < queue.length; i += 10) {
    const current = queue.slice(i, k);
    let j = i;
    k += 10;

    const sendQueue = current
      .map(
        (song) =>
          `**${++j}.** [${song.name}](<${song.url}>) - \`${
            song.formattedDuration
          }\``
      )
      .join("\n");
    allQueue.push(sendQueue);
  }
  return allQueue;
}

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName("queue")
    .setDescription("Show the queue of what music is playing next."),
  async execute(interaction, client) {
    if (!interaction.member.voice.channel) {
      return interaction.reply({
        content:
          "Sorry, you must join a voice channel before using this command.",
        ephemeral: true,
      });
    }

    const queue = client.distube.getQueue(interaction);
    if (!queue) {
      return interaction.reply({
        content: "Queue is empty! 📪",
      });
    }

    try {
      let currentPage = 0;

      const allQueue = generateQueue(queue.songs);

      const message = await interaction.reply({
        content: `**Music Queue:** \t|\t **Current Page: ${currentPage + 1}/${
          allQueue.length
        }** \t|\t **Duration: \`${queue.formattedDuration}\`** \n${
          allQueue[currentPage]
        }`,
        fetchReply: true,
        fetchEdit: true,
      });

      await message.react("⬅️");
      await message.react("❌");
      await message.react("➡️");

      const filter = (reaction, user) =>
        ["⬅️", "❌", "➡️"].includes(reaction.emoji.name) &&
        user.id === interaction.user.id;
      const collector = message.createReactionCollector(filter);

      collector.on("collect", async (reaction) => {
        try {
          if (reaction.emoji.name === "➡️") {
            if (currentPage < allQueue.length - 1) {
              currentPage++;

              message.edit({
                content: `**Music Queue:** \t|\t **Current Page: ${
                  currentPage + 1
                }/${allQueue.length}** \t|\t **Duration: \`${
                  queue.formattedDuration
                }\`** \n${allQueue[currentPage]}`,
              });
            }
          } else if (reaction.emoji.name === "❌") {
            message.reactions
              .removeAll()
              .catch((error) =>
                console.error("Failed to clear reactions:", error)
              );
          } else if (reaction.emoji.name === "⬅️") {
            if (currentPage !== 0) {
              --currentPage;

              message.edit({
                content: `**Music Queue:** \t|\t **Current Page: ${
                  currentPage + 1
                }/${allQueue.length}** \t|\t **Duration: \`${
                  queue.formattedDuration
                }\`** \n${allQueue[currentPage]}`,
              });
            }
          } else {
            collector.stop();
            message.reply("please don't do that");
          }
          await reaction.users.remove(interaction.user.id);
        } catch (error) {
          console.error(error);
          return interaction.reply({
            content: "Error 😢",
            ephemeral: true,
          });
        }
      });
    } catch (error) {
      console.error(error);
      return interaction.reply({
        content: "Opps an error 😢 Still trying to fix it 😖.",
        ephemeral: true,
      });
    }
  },
};
