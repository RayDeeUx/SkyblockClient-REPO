import msgutils from "../functions/msgutils";
import skyclientutils from "../functions/skyclientutils";
import axios from "axios";
import { BotCommand } from '../extensions/BotCommand';
import utils from "../functions/utils";

export default class shortenurl extends BotCommand {
    constructor() {
        super('shortenurl', {
            aliases: ['shortenurl'],
            args: [{ id: 'url', type: 'string', match: 'restContent' }],

            slash: true,
            description: 'Shortens a URL',
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
        const scams = await skyclientutils.getRepo('scamlinks.json')
        if (scams.includes(args.url)) return await msgutils.reply(message, {content:"I won't shorten scam links."}, true)
        const shortenedurl = (await axios.get(`https://api.aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.com/a?url=${args.url}`)).data

        await msgutils.reply(message, {content:shortenedurl})
    }
}