import axios from "axios";
import language from "../constants/language";
import { BotCommand } from '../extensions/BotCommand';
import utils from "../functions/utils";

export default class shortenurl extends BotCommand {
    constructor() {
        super('shortenurl', {
            aliases: ['shortenurl'],
            args: [{ id: 'url', type: 'string', match: 'restContent' }],

            slash: true,
            description: 'Shortens a URL',
            slashGuilds: utils.slashGuilds,
            slashOptions: [
                {
                    name: 'url',
                    description: 'the URL you want shortened',
                    type: 'STRING',
                    required: true
                }
            ],
        })
    }

    async exec(message, args) {
        const shortenedurl = (await axios.get(`https://api.aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.com/a?url=${args.url}`)).data

        if (message.type == 'REPLY') {
            if (message.channel.type == 'GUILD_TEXT') {
                const repliedMessage = await message.channel.messages.fetch(message.reference.messageID)
                repliedMessage.reply({shortenedurl})
            }
        }
        else {
            message.reply(shortenedurl)
        }
    }
}