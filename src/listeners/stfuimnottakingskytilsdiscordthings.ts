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
        if (message.author.bot == true) { return }
        const notStolenFromSkytilsDiscordJson = await axios(`https://raw.githubusercontent.com/nacrt/SkyblockClient-REPO/main/files/botautoresponse.json`, { method: "get" })

        notStolenFromSkytilsDiscordJson.data.forEach(trigger => {
            const triggers = (trigger.triggers)
            const response = (trigger.response)
            const content = message.content.toLowerCase()

            let contains = recursiveSearch(content, triggers, 0)
            if (contains) {
                message.channel.send(response)
            }

        })
    }
}

function recursiveSearch(cutContent: string, triggers: Array<Array<string>>, index: number): boolean {
    const wordList = triggers[index];
    let indexOf = -1;

    for (const word of wordList) {
        indexOf = cutContent.indexOf(word);
        if (indexOf != -1) {
            indexOf += word.length
            if (triggers.length == index + 1) {
                return true;
            }
            break;
        }
    }
    if (indexOf != -1) {
        return recursiveSearch(cutContent.substr(indexOf), triggers, index + 1)
    }
    return false;

}

module.exports = notStolenFromSkytilsDiscord;
