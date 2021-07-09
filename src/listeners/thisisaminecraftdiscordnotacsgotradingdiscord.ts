import { exec } from 'child_process';
import { promisify } from 'util';
import { BotListener } from '../extensions/BotListener';
import fs from 'fs';
import commandManager from '../functions/commandManager';

class thisIsAMinecraftModDiscordNotACSGOTradingDiscord extends BotListener {
    constructor() {
        super('thisIsAMinecraftModDiscordNotACSGOTradingDiscord', {
            emitter: 'client',
            event: 'message'
        });
    }

    async exec(message) {
        try {
            const fsJson = fs.readFileSync('src/listeners/fakeSteamcommunityLinks.json', 'utf8')
            let ohMyFuckingGodThisIsADiscordForMinecraftNotForCSGOTradingOrScammingOfAnyKind = JSON.parse(fsJson)

            // console.log(message.content.replace('<', '').replace('>', ''))
            // console.log(message.content.match(/\/trade\/new\/\?partner=\d*&token=[a-z0-9]+/gi))



            ohMyFuckingGodThisIsADiscordForMinecraftNotForCSGOTradingOrScammingOfAnyKind.forEach(async fakeSteamLink => {
                if ( /*new RegExp(/\/trade\/\?partner=\d*&token=[a-z0-9]+|\/tradeoffer\/new\/\?partner=\d/, "gi").test(message.content) && */ message.content.includes(fakeSteamLink)) {
                    if (message.member) {
                        let hasRole = false
                        message.member.roles.cache.forEach(role => {
                            if (commandManager.bypassRoles.includes(role) || message.author.id == message.guild.ownerID) {
                                return hasRole = true
                            }
                        })
                        if (hasRole = true) {
                            message.delete()
                            return message.channel.send(`hey yeah you shouldn't send those ${message.author}`)
                        }
                    }

                    if (message.member.bannable) {
                        try { await message.author.send('Hey, did you know that we ban for scamming?') }
                        catch (err) { return }
                        message.member.ban({ reason: 'Sending a scam link' })
                        message.delete()
                        message.guild.channels.cache.get('796895966414110751').send(`${message.author.tag} has been banned for steam scam link`)
                    }
                }
            })
        }
        catch (err) { return }
    }
}

module.exports = thisIsAMinecraftModDiscordNotACSGOTradingDiscord;