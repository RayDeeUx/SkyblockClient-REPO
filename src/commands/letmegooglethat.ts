import language from "../constants/language";
import { BotCommand } from '../extensions/BotCommand';
import utils from "../functions/utils";

export default class letmegooglethat extends BotCommand {
    constructor() {
        super('letmegooglethat', {
            aliases: ['letmegooglethat', 'lmgt', 'lmgtfy'],
            args: [{ id: 'thingtogoogle', type: 'string', match: 'restContent'}]
        })
    }
    async exec(message, args) {
        message.channel.send(`<${encodeURI(`https://letmegooglethat.com/?q=${args.thingtogoogle}`)}>`)
    }
}