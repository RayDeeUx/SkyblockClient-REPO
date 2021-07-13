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
        if (message.content.startsWith('-') && message.channel.id != '780181693553704973') { return }
        if (!message.content.startsWith('-') && message.channel.id == '780181693553704973') { return }

        if (message.content.startsWith('$')) { return }
        if (message.author.bot != false) { return }

        let noAutorespond = false
        // message.member.roles.cache.forEach(role => {
        //     if (role.id == '852016624605462589') {
        //         return noAutorespond = true
        //     }
        // })
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

                const filter = i => i.customId === 'autoresponseDeleteMessage' && i.user.id == message.author.id
                message.channel.awaitMessageComponent({ filter, time: 15000 })
                    .then(i => {
                        if (i.customId == 'autoresponseDeleteMessage') {
                            sent.delete()
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
