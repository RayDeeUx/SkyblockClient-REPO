import { BotCommand } from '../../extensions/BotCommand';

export default class nonPartneredDiscords extends BotCommand {
    constructor() {
        super('nonPartneredDiscords', {
            aliases: ['nonPartneredDiscords'],
            channel: 'guild'
        });
    }

    async exec(message) {
        const SkyClientGuilds = [
            `780181693100982273`, //main server
            `824680357936103497` //testing server
        ]
        if (SkyClientGuilds.includes(message.guild.id)) {
        }
        else { return }
    }
}
