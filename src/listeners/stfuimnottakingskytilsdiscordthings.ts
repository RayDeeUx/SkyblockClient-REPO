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
        const notStolenFromSkytilsDiscordJson = await axios(`https://raw.githubusercontent.com/nacrt/SkyblockClient-REPO/main/files/bottags.json`, { method: "get" })

        notStolenFromSkytilsDiscordJson.data.forEach(trigger => {
            if (trigger.trigger2) {
                if (message.content.includes(`how`) && message.content.includes(trigger.trigger) && message.content.includes(trigger.trigger2)) {
                    message.channel.send(trigger.response)
                }
            }
            else {
                if (message.content.includes(`how`) && message.content.includes(trigger.trigger)) {
                    message.channel.send(trigger.response)
                }
            }
        })
    }
}

module.exports = notStolenFromSkytilsDiscord;