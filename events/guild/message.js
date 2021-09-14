// const { Intents } = require("discord.js");

// const cooldowns = new Map();

module.exports = (Discord, client, message) => {
    const prefix = '?';
    
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    // const command = client.commands.get(cmd);

    const command = client.commands.get(cmd) || 
                    client.commands.find(a =>  a.aliases && a.aliases.includes(cmd));

                    // if(!cooldowns.has(command.name)){
                    //     cooldowns.set(command.name, new Discord.Collection());
                    // }

                    // const current_time = Date.now();
                    // const time_stamps = cooldowns.get(command.name);
                    // const cooldown_amount = (command.cooldowns) * 1000;

                    // if(time_stamps.has(message.suthor.id)){
                    //     const expiration_time = time_stamps.get(message.author.id) + cooldown_amount;

                    //     if(current_time < excpioration_time){
                    //         const time_left = (expiration_time - current_time) / 1000;

                    //         return message.reply('Tunggu ${time_left.toFixed(1)} detik lagi baru bisa pake ${command.name}');
                    //     }
                    // }

                    // // time_stamps.set(message.author.id, current_time);
                    // // setTimeout(() => time_stamps.delete(message.author.id), cooldown_amount);

    
        

    
    try {
        command.execute(client, message, args, cmd, Discord);
    } catch (err) {
        message.reply("ga bisa error");
        console.log(err);
    }    
    // if (command) command.execute(message, args, cmd, client, Discord); 

    
}