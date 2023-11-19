<div align="center">
  <img src="https://docs.discordbox.dev/logo.svg" alt="DiscordBox logo" width="256" height="256">
  <h1 align="center">DiscordBox</h1>
  <p align="center">A Discord Bot framework built on top of <a href="https://discord.js.org/">discord.js</a> that allows you to focus on what makes your bot unique.</p>

[![npm version](https://badgen.net/npm/v/discordbox)](https://www.npmjs.com/package/discordbox)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/discordbox?label=size)
[![CodeFactor](https://www.codefactor.io/repository/github/kibotrel/discordbox/badge?s=1459584c7b64ad6f067146acc6cf10108516a45f)](https://www.codefactor.io/repository/github/kibotrel/discordbox)
![GitHub License](https://img.shields.io/github/license/kibotrel/DiscordBox)

</div>

## 📦 Install

```sh
npm install discordbox
```

## 🚀 Getting started

The following example shows how to create and start a bot that registers a slash command called `ping` that replies with `Pong!` when used.

```js
import { SlashCommandBuilder } from 'discord.js'
import { DiscordBot } from 'discordbox'

const bot = new DiscordBot({
  token: 'xxxxxxxxxxxxxxxxxx',
  guildId: 'xxxxxxxxxxxxxxxxxx',
  clientId: 'xxxxxxxxxxxxxxxxxx',
  supportUserId: 'xxxxxxxxxxxxxxxxxx',
})

const ping = {
  action: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('sends Pong!'),

  callback: async (interaction) => {
    await interaction.reply({ content: 'Pong!', ephemeral: true })
  },
}

bot.addGenericInteractions([ping])

await bot.start()
```

## 📖 Documentation

You can find the full documentation on [docs.discordbox.dev](https://docs.discordbox.dev).

## ✨ Contributing

Contributions are welcome, feel free to open an issue or submit a pull request.

## 🔑 License

This project is licensed under the Apache-2.0 License - see the [LICENSE](LICENSE) file for details.
