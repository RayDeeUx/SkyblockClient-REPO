import axios from 'axios';
import { Listener } from 'discord-akairo';
import { BotListener } from '../extensions/BotListener';

class notStolenFromSkytilsDiscord extends BotListener {
    constructor() {
        super('notStolenFromSkytilsDiscord', {
            emitter: 'client',
            event: 'message'
        });
    }

    async exec(message) {
        const notStolenFromSkytilsDiscordJson = await axios(`https://raw.githubusercontent.com/nacrt/SkyblockClient-REPO/main/files/botautoresponse.json`, { method: "get" })

        notStolenFromSkytilsDiscordJson.data.forEach(trigger => {
            const words = (trigger.triggers[0])
            const triggers = (trigger.triggers[1])
            const response = (trigger.response)

            words.forEach(word => {
                triggers.forEach(trigger => {
                    if (message.content.includes(word) && message.content.includes(trigger) && message.author.bot == false) {
                        message.channel.send(response)
                    }
                })
            })
        })

    }
}

module.exports = notStolenFromSkytilsDiscord;