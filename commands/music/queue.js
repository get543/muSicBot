const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require("discord.js");

// queue embed function
function generateEmbedQueue(message, queue, duration) {
  const allQueue = [];
  let k = 10;
  for (let i = 0; i < queue.length; i += 10) {
    const current = queue.slice(i, k);
    let j = i;
    k += 10;

    const info = current
      .map((song) => `**${++j}**. [${song.name}](${song.url}) - \`${song.formattedDuration}\``)
      .join("\n");

    const sendEmbed = new EmbedBuilder()
      .setAuthor({
        name: `${message.guild.name}`,
        iconURL: message.guild.iconURL(),
      })
      .setTitle("Music Queue")
      .setColor(0xf8aa2a)
      .setDescription(info)
      .addFields({
        name: "\u200b",
        value: `Requested by: <@${message.user.id}>`,
      })
      .setTimestamp()
      .setFooter({
        text: `${duration} left`,
        iconURL: queue[0].thumbnail,
      });

    allQueue.push(sendEmbed);
  }
  return allQueue;
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("queue")
    .setDescription("Show the queue of what music is playing next."),
  async execute(interaction, client) {
    if (!interaction.member.voice.channel) {
      return interaction.reply({
        content: "Sorry, you must join a voice channel before using this command.",
        flags: MessageFlags.Ephemeral,
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

      const allQueue = generateEmbedQueue(interaction, queue.songs, queue.formattedDuration);

      const message = await interaction.reply({
        content: `**Current Page: ${currentPage + 1}/${allQueue.length}**`,
        embeds: [allQueue[currentPage]],
        fetchReply: true,
        fetchEdit: true,
      });

      await message.react("⬅️");
      await message.react("❌");
      await message.react("➡️");

      const filter = (reaction, user) =>
        ["⬅️", "❌", "➡️"].includes(reaction.emoji.name) && user.id === interaction.user.id;
      const collector = message.createReactionCollector(filter);

      collector.on("collect", async (reaction) => {
        try {
          if (reaction.emoji.name === "➡️") {
            if (currentPage < allQueue.length - 1) {
              currentPage++;

              message.edit({
                content: `**Current Page: ${currentPage + 1}/${allQueue.length}**`,
                embeds: [allQueue[currentPage]],
              });
            }
          } else if (reaction.emoji.name === "❌") {
            message.reactions
              .removeAll()
              .catch((error) => console.error("Failed to clear reactions:", error));
          } else if (reaction.emoji.name === "⬅️") {
            if (currentPage !== 0) {
              --currentPage;

              message.edit({
                content: `**Current Page: ${currentPage + 1}/${allQueue.length}**`,
                embeds: [allQueue[currentPage]],
              });
            }
          } else {
            collector.stop();
            message.reply("Please don't do that");
          }
          await reaction.users.remove(interaction.user.id);
        } catch (error) {
          console.error(error);
          return interaction.reply({
            content: "Error 😢",
            flags: MessageFlags.Ephemeral,
          });
        }
      });
    } catch (error) {
      console.error(error);
      return interaction.reply({
        content: "Opps an error 😢 \nStill trying to fix it 😖.",
        flags: MessageFlags.Ephemeral,
      });
    }
  },
};
