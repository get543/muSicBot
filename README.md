# 🎶 muSicBot

Discord Music Bot created using [DisTube](https://distube.js.org/#/)

# 🎉 Features

- [x] Slash Commands
- [x] YouTube, Spotify, SoundCloud support
- [x] Dynamic Queue System

For more info you can do `/help` for all available music commands

# 🤳 Self Host

1. Create a [bot account](https://discord.com/developers/applications)

   - Turn the app into a bot in the 'bot' section
   - Copy the bot token

2. Create a `.env` file in the root directory, containing:

```
DISCORD_TOKEN = <paste-your-bot-token-here>

clientID = <bot's id>

guildID = <server's id>
```

3. Open terminal and navigate to the project folder

4. Run this command :

```bash
# install missing dependencies
npm install

# run the bot
npm start
```
