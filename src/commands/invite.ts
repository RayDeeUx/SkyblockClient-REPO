import { MessageEmbed } from 'discord.js';
import { BotCommand } from '../extensions/BotCommand';
import utils from "../functions/utils";

export default class invite extends BotCommand {
    constructor() {
        super('invite', {
            aliases: ['invite'],

            slashOptions:[],
            slash: true,
            description: '"Invite the bot"',
            slashGuilds: utils.slashGuilds,
            slashOptions:[
                {
                    name:'ephemeral',
                    description:'ephemeral or not ephemeral',
                    type:'BOOLEAN'
                }
            ]
        })
    }

    async exec(message, args) {
        const inviteEmbed = new MessageEmbed()
            .setTitle('Invite me to your server!')
            .setDescription('[A few things you should know](https://genius.com/Rick-astley-never-gonna-give-you-up-lyrics)')
            .setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
            .setColor(message.member.displayColor)

        await message.reply({embeds:[inviteEmbed], ephemeral:args.ephemeral})
    }
}
