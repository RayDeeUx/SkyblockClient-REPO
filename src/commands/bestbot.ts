import { Message } from 'discord.js';
import { BotCommand } from '../extensions/BotCommand';
import utils from "../functions/utils";

export default class bestbot extends BotCommand {
    constructor() {
        super('bestbot', {
            aliases: ['bestbot'],

            slash: true,
            description: 'bestbot',
            slashGuilds: utils.slashGuilds,
        })
    }

    async exec(message: Message) {
        message.reply('fire ofc')
    }
}