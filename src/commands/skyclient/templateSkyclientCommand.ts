import { BotCommand } from '../../extensions/BotCommand';
import utils from '../../functions/utils';

export default class templateSkyclientCommand extends BotCommand {
    constructor() {
        super('templateSkyclientCommand', {
            aliases: ['templateSkyclientCommand'],
            channel: 'guild'
        });
    }

    async exec(message) {

        if (utils.SkyClientGuilds.includes(message.guild.id)) {
            message.reply(`This is a SkyClient server!`)
        }
        else {
            message.channel.send(`e`)
        }
    }
}
