import language from "../constants/language";
import { BotCommand } from '../extensions/BotCommand';
import utils from "../functions/utils";

export default class letmegooglethat extends BotCommand {
    constructor() {
        super('letmegooglethat', {
            aliases: ['letmegooglethat', 'lmgt', 'lmgtfy'],
            args: [{ id: 'thingtogoogle', type: 'string', match: 'restContent'}],
            slash:true,
            description: 'https://letmegooglethat.com',
            slashGuilds: ['824680357936103497', '780181693100982273', '794610828317032458'],
            slashOptions:[
                {
                    name:'thingtogoogle', 
                    description: 'What you want to google', 
                    type:'STRING', 
                    required: true
                }
            ],
        })
    }
    async exec(message, args) {
        message.reply(`<${encodeURI(`https://letmegooglethat.com/?q=${args.thingtogoogle}`)}>`)
    }
    async execSlash(message, slashOptions) {
        message.reply(`<${encodeURI(`https://letmegooglethat.com/?q=${slashOptions.thingtogoogle}`)}>`)
    }
}