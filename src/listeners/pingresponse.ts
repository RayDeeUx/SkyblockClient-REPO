import { BotListener } from '../extensions/BotListener';

class misclisteners extends BotListener {
    constructor() {
        super('misclisteners', {
            emitter: 'client',
            event: 'messageCreate'
        });
    }

    exec(message) {
        if (message.content == `<@!${this.client.user.id}>` && message.author.bot == false) {
            message.channel.send('hello yes my prefix is `-` or you can ping me instead of that')
        }

        if (message.content.toLowerCase().includes('good bot')) {
            message.channel.send(`<:happey:827600317570220093>`)
        }

        if (message.content.toLowerCase().includes('bad bot')) {
            message.channel.send(`<a:wahh:841055174302629948>`)
        }
    }
}

module.exports = misclisteners;