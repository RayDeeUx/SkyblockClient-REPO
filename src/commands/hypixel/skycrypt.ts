import { BotCommand } from '../../extensions/BotCommand';
import utils from '../../functions/utils';

export default class skycrypt extends BotCommand {
    constructor() {
        super('skycrypt', {
            aliases: ['skycrypt'],
            args: [{ id: 'ign', type: 'string' }],

            slash: true,
            slashGuilds:utils.slashGuilds,
            description: 'Sends the SkyCrypt link for whoever you want',
            slashOptions: [
                {
                    name: 'player',
                    description: 'The Minecraft account you want the SkyCrypt page of',
                    type: 'STRING'
                }
            ]
        });
    }

    async exec(message, args) {
        message.reply(`https://sky.shiiyu.moe/stats/${args.ign}`);
    }
}
