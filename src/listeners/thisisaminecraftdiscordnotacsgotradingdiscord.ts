import { exec } from 'child_process';
import { promisify } from 'util';
import { BotListener } from '../extensions/BotListener';
import fs from 'fs';
import commandManager from '../functions/commandManager';
import skyclientutils from '../functions/skyclientutils';

class thisIsAMinecraftModDiscordNotACSGOTradingDiscord extends BotListener {
    constructor() {
        super('thisIsAMinecraftModDiscordNotACSGOTradingDiscord', {
            emitter: 'client',
            event: 'messageCreate'
        });
    }

    async exec(message) {
        if (message.author.id != this.client.user.id)
        if (message.member.roles.cache.includes('780182606628782100')) return

            {//const fsJson = fs.readFileSync('src/listeners/fakeSteamcommunityLinks.json', 'utf8')
            let ohMyFuckingGodThisIsADiscordForMinecraftNotForCSGOTradingOrScammingOfAnyKind = await skyclientutils.getRepo('scamlinks.json', true)

            // console.log(message.content.replace('<', '').replace('>', ''))
            // console.log(message.content.match(/\/trade\/new\/\?partner=\d*&token=[a-z0-9]+/gi))

            ohMyFuckingGodThisIsADiscordForMinecraftNotForCSGOTradingOrScammingOfAnyKind.forEach(async fakeSteamLink => {
                if ( /*new RegExp(/\/trade\/\?partner=\d*&token=[a-z0-9]+|\/tradeoffer\/new\/\?partner=\d/, "gi").test(message.content) && */ message.content.includes(fakeSteamLink)) {
                    if (message.member) {
                        let hasRole = false
                        message.member.roles.cache.forEach(role => {
                            if (commandManager.bypassRoles.includes(role.id) || message.author.id == message.guild.ownerID) {
                                return hasRole = true
                            }
                        })
                        if (hasRole) {
                            message.delete()
                            message.guild.channels.cache.get('796895966414110751').send(`${message.author.tag} sent a scam link.\nMessage content: \`\`\`\n${message.content}\`\`\``)
                            return message.channel.send(`hey yeah you shouldn't send those ${message.author}`)
                        }

                        if (message.member.bannable && !hasRole) {
                            try { await message.author.send('Hey, did you know that we ban for scamming?') }
                            catch (err) { }
                            message.member.ban({ reason: 'Sending a scam link' })
                            message.delete()
                            message.guild.channels.cache.get('796895966414110751').send(`${message.author.tag} has been banned for sending a scam link`)
                        }
                    }
                }
            })
        }
    }
}

module.exports = thisIsAMinecraftModDiscordNotACSGOTradingDiscord;
