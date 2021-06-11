import { Command } from 'discord-akairo';
import { MessageEmbed } from 'discord.js';
import { BotCommand } from '../../../extensions/BotCommand';
import utils from '../../../functions/utils';

export default class animateicon extends BotCommand {
    constructor() {
        super('animateicon', {
            aliases: ['animateicon'],
            clientPermissions: ['MANAGE_GUILD', 'EMBED_LINKS'],
            userPermissions: ['MANAGE_GUILD'],
            channel: 'guild'
        });
    }

    async exec(message) {
        message.guild.setIcon('https://cdn.discordapp.com/emojis/813444028892577843.gif?v=1')
        message.channel.send(`icon animated hopefully`)
    }
}
