import { Listener } from 'discord-akairo';
import { BotListener } from '../extensions/BotListener';
import utils from '../functions/utils';

class autorole extends BotListener {
    constructor() {
        super('autorole', {
            emitter: 'client',
            event: 'message'
        });
    }

    async exec(message) {
        if (!message.member.roles.cache.has('780449281760428042') && message.author.bot == false) {
            message.member.roles.add('780449281760428042')
        }
    }
}

module.exports = autorole;