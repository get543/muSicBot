const Discord = require("discord.js");

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName("loop")
    .setDescription("Loop songs or repeating queue or disable loop.")
    .addStringOption((option) =>
      option
        .setName("option")
        .setDescription("What you want to loop ?")
        .setRequired(true)
        .addChoices(
          { name: "song", value: "loop_song" },
          { name: "queue", value: "loop_queue" },
          { name: "disable", value: "loop_disable" }
        )
    ),
  async execute(interaction, client) {
    if (!interaction.member.voice.channel) {
      return interaction.reply({
        content: "Sorry, you must join a voice channel before using this command",
        ephemeral: true,
      });
    }

    const queue = await client.distube.getQueue(interaction);
    if (!queue) {
      return interaction.reply({
        content: "Queue is empty! 📪",
      });
    }

    if (interaction.options.getString("option") === "loop_song") {
      client.distube.setRepeatMode(interaction, 1);
      return interaction.reply({ content: "🔁 Looping the song" });
    } else if (interaction.options.getString("option") === "loop_queue") {
      client.distube.setRepeatMode(interaction, 2);
      return interaction.reply({ content: "🔂 Repeating the queue" });
    } else if (interaction.options.getString("option") === "loop_disable") {
      client.distube.setRepeatMode(interaction, 0);
      return interaction.reply({
        content: "❌ Repeat mode is set to disabled",
      });
    }
  },
};
