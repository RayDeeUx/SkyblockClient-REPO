import { MessageEmbed } from 'discord.js';
import { BotCommand } from '../extensions/BotCommand';
import utils from "../functions/utils";

export default class invite extends BotCommand {
    constructor() {
        super('invite', {
            aliases: ['invite'],

            slash: true,
            description: '"Invite the bot"',
            slashGuilds: utils.slashGuilds,
        })
    }

    async exec(message) {
        const inviteEmbed = new MessageEmbed()
            .setTitle('Invite me to your server!')
            .setDescription('[A few things you should know](https://genius.com/Rick-astley-never-gonna-give-you-up-lyrics)')
            .setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
            .setColor(message.member.displayColor)

        await message.reply({embeds:[inviteEmbed]})
    }
}