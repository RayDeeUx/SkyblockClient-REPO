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
            slashGuilds: utils.slashGuilds,
            slashOptions: [
                {
                    name: 'person',
                    description: 'The person you want the PFP of',
                    type: 'USER',
                    required: false
                }
            ],
            description: 'Shows you the profile picture of someone'
        });
    }

    async exec(message, args) {
        let user
        if (args.person) { user = args.person.user }
        else { user = message.author }
        message.reply(user.displayAvatarURL({ size: 2048, dynamic: true }))
    }
}