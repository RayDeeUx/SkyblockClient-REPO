import { BotListener } from '../extensions/BotListener';

export default class extends BotListener {
    constructor() {
        super('goodbotbadbot', {
            emitter: 'client',
            event: 'messageCreate'
        });
    }

    async exec(message) {
        if (message.content.toLowerCase() === 'good bot') {await message.reply('yes i am a good bot')}
        if (message.content.toLowerCase() === 'bad bot') {await message.reply('its like you want to be banned')}
    }
}