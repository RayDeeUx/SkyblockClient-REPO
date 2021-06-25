import { BotCommand } from '../../../extensions/BotCommand';

export default class animateicon extends BotCommand {
    constructor() {
        super('animateicon', {
            aliases: ['animateicon'],
            clientPermissions: ['MANAGE_GUILD', 'EMBED_LINKS'],
            userPermissions: ['MANAGE_GUILD'],
        });
    }

    async exec(message) {
        message.guild.setIcon('https://cdn.discordapp.com/emojis/813444028892577843.gif?v=1')
        message.reply(`icon animated hopefully`)
    }
}
