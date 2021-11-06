import DiscordJS, { Intents } from 'discord.js'
import dotenv from 'dotenv'
dotenv.config()

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
})


client.on('ready', () => {
    console.log('Bot is online')
})

client.on('messageCreate', (message) => {
    if (message.content === 'test') {
        message.reply({
            content: 'Working'
        })
    }
})


client.login(process.env.DISCORD_TOKEN)