import { MessageEmbed } from 'discord.js';
import { BotCommand } from '../extensions/BotCommand';
import utils from '../functions/utils';

export default class avatar extends BotCommand {
    constructor() {
        super('avatar', {
            aliases: ['avatar', 'av', 'pfp'],
            args: [
                { id: "person", type: "member" }
            ],

            slash: true,
            slashGuilds:utils.slashGuilds,
            slashOptions: [
                {
                    name: 'person',
                    description: 'The person you want the PFP of',
                    type: 'USER',
                }
            ],
            description: 'Shows you the profile picture of someone'
        });
    }

    async exec(message, args) {
        message.reply(args.person.user.displayAvatarURL())
    }
}