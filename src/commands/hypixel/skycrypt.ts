import msgutils from '../../functions/msgutils';
import { BotCommand } from '../../extensions/BotCommand';
import utils from '../../functions/utils';

export default class skycrypt extends BotCommand {
    constructor() {
        super('skycrypt', {
            aliases: ['skycrypt'],
            args: [{ id: 'ign', type: 'string' }, {id: 'profile', type: 'string', match:'rest', flag: '--profile'}],

            slash: true,
            slashGuilds:utils.slashGuilds,
            description: 'Sends the SkyCrypt link for whoever you want',
            slashOptions: [
                {
                    name: 'ign',
                    description: 'The Minecraft account you want the SkyCrypt page of',
                    type: 'STRING',
                    required:true
                },
                {
                    name: 'profile',
                    description: 'the profile of the person',
                    type:'STRING'
                }
            ]
        });
    }

    async exec(message, args) {
        if (!args.profile) await msgutils.reply(message, {content:`https://sky.shiiyu.moe/stats/${args.ign}`})
        else if (args.profile) await msgutils.reply(message, {content:`https://sky.shiiyu.moe/stats/${args.ign}/${args.profile}`})
    }
}
