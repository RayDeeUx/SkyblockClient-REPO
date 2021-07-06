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

            ohMyFuckingGodThisIsADiscordForMinecraftNotForCSGOTradingOrScammingOfAnyKind.forEach(async fakeSteamLink => {
                if (message.content.includes(fakeSteamLink)) {

                    if (message.member) {
                        let hasRole = false
                        message.member.roles.cache.forEach(role => {
                            if (commandManager.bypassRoles.includes(role)) {
                                return hasRole = true
                            }
                        })
                        if (hasRole = true) {
                            message.delete()
                            return message.channel.send(`hey yeah you shouldn't send those ${message.author}`)
                        }
                    }
                    
                    if (message.member.bannable) {
                        try{message.author.send('Hey, did you know that we ban for scamming?')}
                        catch(err){return}
                        message.member.ban({ days: 1, reason: 'Sending a scam link' })
                        message.delete()
                    }
                }
            })
        }
        catch (err) { return }
    }
}

module.exports = thisIsAMinecraftModDiscordNotACSGOTradingDiscord;