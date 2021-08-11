import { BotListener } from '../extensions/BotListener';
import fs from 'fs';
import { MessageActionRow, MessageButton } from 'discord.js';
import utils from '../functions/utils';


class notStolenFromSkytilsDiscord extends BotListener {
    constructor() {
        super('notStolenFromSkytilsDiscord', {
            emitter: 'client',
            event: 'messageCreate'
        });
    }

    async exec(message) {
        if (message.channel.type != 'GUILD_TEXT') { return }
        if (message.content.startsWith('```md')) { return }
        if (message.content.startsWith('.')) { return }
        if (message.content.startsWith('-')) { return }

        if (message.content.startsWith('$')) { return }
        if (message.author.bot != false) { return }

        let noAutorespond = false
        
        if (message.member.roles.cache.has('852016624605462589')) { return noAutorespond = true }

        let notStolenFromSkytilsDiscordJson = JSON.parse(fs.readFileSync('SkyblockClient-REPO/files/botautoresponse.json', 'utf8'))

        const row = new MessageActionRow().addComponents(
            new MessageButton()
                .setLabel('Delete')
                .setStyle('DANGER')
                .setCustomId('autoresponseDeleteMessage')
        )

        let response
        notStolenFromSkytilsDiscordJson.forEach(async trigger => {
            const triggers = (trigger.triggers)
            const content = message.content.toLowerCase()

            let contains = recursiveSearch(content, triggers, 0)
            if (contains && noAutorespond == false) {

                response = (trigger.response)

                const sent = await message.reply({ content: response, components: [row] })

                const filter = i => i.customId === 'autoresponseDeleteMessage' && i.user.id == message.author.id || i.customId === 'autoresponseDeleteMessage' && i.member.roles.cache.has('780182606628782100')
                message.channel.awaitMessageComponent({ filter, time: 15000 })
                    .then(i => {
                        if (i.customId == 'autoresponseDeleteMessage') {
                            sent.delete()
                        }
                    })
                    .catch(err => {
                        if (err == 'Error [INTERACTION_COLLECTOR_ERROR]: Collector received no interactions before ending with reason: time') {
                            if (!sent) {return}
                            sent.edit({ content: sent.content, components: [] })
                        }
                        else if (err == 'DiscordAPIError: Unknown Message') {return}
                        else {
                            this.handler.emit('error', err)
                        }
                    })
            }
        })
    }
}

function recursiveSearch(cutContent: string, triggers: Array<Array<string>>, index: number): boolean {
    const wordList = triggers[index];
    let indexOf = -1;

    for (const word of wordList) {
        indexOf = cutContent.indexOf(word)
        if (indexOf != -1) {
            indexOf += word.length
            if (triggers.length == index + 1) { return true }
            break
        }
    }
    if (indexOf != -1) {
        return recursiveSearch(cutContent.substr(indexOf), triggers, index + 1)
    }
    return false
}

module.exports = notStolenFromSkytilsDiscord;
