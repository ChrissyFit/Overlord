import DiscordJS, { Intents, MessageAttachment } from 'discord.js'
import dotenv from 'dotenv'
import { spawn, spawnSync } from 'child_process'
import path from 'path'
const __dirname = path.resolve();
dotenv.config()

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
})


client.on('ready', () => {
    console.log('Bot is online')
    const guild = client.guilds.cache.get(process.env.GUILDID)
    let commands

    if (guild) {
        commands = guild.commands
    }
    else {
        commands = client.application.commands
    }

    commands.create({
        name: 'muscleman',
        description: 'Creates a muscleman img from user inputted text.',
        options: [
            {
                name: 'prompt',
                description: 'Prompt after "You know who else"',
                required: true,
                type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING
            }
        ]
        
    })
})

client.on('messageCreate', (message) => {
    if (message.content === 'test') {
        message.reply({
            content: 'Working'
        })
    }
})

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) {
        return
    }

    const { commandName, options } = interaction

    if (commandName === 'muscleman') {
         spawnSync(
             'python3', 
             ['muscleman-command/muscleman-img-create.py', options.getString('prompt')]
         )

         const image = path.join(__dirname, 
             'muscleman-command/muscleman_meme_temp.png')

         interaction.reply({
             files: [{
                 attachment: image
             }]
         })

       // interaction.reply({
       //     content: "Currently unavailable."
       // })

    }
})

console.log(__dirname)

client.login(process.env.DISCORD_TOKEN)
