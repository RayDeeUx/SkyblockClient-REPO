import { BotListener } from '../extensions/BotListener';
import fs from 'fs';


class notStolenFromSkytilsDiscord extends BotListener {
    constructor() {
        super('notStolenFromSkytilsDiscord', {
            emitter: 'client',
            event: 'message'
        });
    }

    async exec(message) {
        if (message.content.startsWith('.')) { return }
        if (message.content.startsWith('-')) { return }
        if (message.content.startsWith('$')) { return }
        if (message.author.bot != false) { return }

        let noAutorespond = false
        message.member.roles.cache.forEach(role => {
            if (role.id == '852016624605462589') {
                return noAutorespond = true
            }
        })

        let notStolenFromSkytilsDiscordJson = JSON.parse(fs.readFileSync('SkyblockClient-REPO/files/botautoresponse.json', 'utf8'))

        notStolenFromSkytilsDiscordJson.forEach(trigger => {
            const triggers = (trigger.triggers)
            const response = (trigger.response)
            const content = message.content.toLowerCase()

            let contains = recursiveSearch(content, triggers, 0)
            if (contains && noAutorespond == false) {
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
