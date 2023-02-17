<h1 align="center">
  <br>
  <img
    src="https://cdn.discordapp.com/attachments/869408567629873212/1040992476573478923/luthung_kasarung.jpg" 
    style="border-radius: 50%"
  >
  <br>
  SicBot
</h1>

<h5 align="center">
  Discord Music Bot created using <a href="https://distube.js.org/)">DisTube</a> and 
  the latest version of <a href="https://discord.js.org">discord.js</a>
</h5>

<h5 align="center">
  <a href="https://github.com/prettier/prettier">
    <img src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=plastic&logo=prettier">
  </a>

  <a href="https://github.com/eslint/eslint">
    <img src="https://img.shields.io/badge/lint-eslint-blueviolet?style=plastic&logo=eslint">
  </a>

  <a href="https://github.com/skick1234/DisTube">
    <img src="https://img.shields.io/badge/music-distube-red?style=plastic&logo=dtube">
  </a>

  <a href="https://github.com/motdotla/dotenv">
    <img src="https://img.shields.io/badge/environment%20variables-.env-ECD53F?style=plastic?&logo=dotenv">
  </a>
</h5>

# 🎉 Features

- [x] Slash Commands
- [x] YouTube, Spotify, and SoundCloud support
- [x] Dynamic Queue System

For more info you can do `/help` for all available music commands

# 🤳 Self Host

1. Create a new applications [here](https://discord.com/developers/applications)

- Turn the app into a bot in the 'bot' section
- Copy the bot token

2. Create a `.env` file in the root directory, containing:

```
DISCORD_TOKEN = "paste-your-bot-token-here"

clientID = "bot-id"

guildID = "server-id"
```

3. Open terminal and navigate to the project folder

4. Run this command :

```bash
# install missing dependencies
npm install

# run the bot
npm start
```

> Note: Cannot be hosted on cloud. You have to host it yourself

# ❌ Deleting Commands

Delete registered commands on discord and to avoid confusion of the same commands.

### Delete Global Commands

```bash
npm run deglobal
```

### Delete Guild Commands

```bash
npm run deguild
```
