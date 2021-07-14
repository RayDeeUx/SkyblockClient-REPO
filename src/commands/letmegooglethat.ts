import language from "../constants/language";
import { BotCommand } from '../extensions/BotCommand';
import utils from "../functions/utils";

export default class letmegooglethat extends BotCommand {
    constructor() {
        super('letmegooglethat', {
            aliases: ['letmegooglethat', 'lmgt', 'lmgtfy'],
            args: [{ id: 'thingtogoogle', type: 'string', match: 'restContent' }],

            slash: true,
            description: 'https://letmegooglethat.com',
            slashGuilds: utils.slashGuilds,
            slashOptions: [
                {
                    name: 'thingtogoogle',
                    description: 'What you want to google',
                    type: 'STRING',
                    required: true
                }
            ],
        })
    }

    async exec(message, args) {
        const googledthing = `<${encodeURI(`https://letmegooglethat.com/?q=${args.thingtogoogle}`)}>`

        if (message.type == 'REPLY') {
            if (message.channel.type == 'GUILD_TEXT') {
                const repliedMessage = await message.channel.messages.fetch(message.reference.messageID)
                repliedMessage.reply({ googledthing })
            }
        }
        else {
            message.reply(googledthing)
        }
    }
}