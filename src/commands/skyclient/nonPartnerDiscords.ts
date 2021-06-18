import axios from 'axios';
import { MessageEmbed } from 'discord.js';
import { BotCommand } from '../../extensions/BotCommand';

export default class nonPartneredDiscords extends BotCommand {
    constructor() {
        super('nonPartneredDiscords', {
            aliases: ['nonPartneredDiscords'],
        })
    }

    async exec(message) {
        const SkyClientGuilds = [
            `780181693100982273`, //main server
            `824680357936103497` //testing server
        ]
        if (SkyClientGuilds.includes(message.guild.id)) {
            const discords = await axios(`https://raw.githubusercontent.com/nacrt/SkyblockClient-REPO/main/files/discords.json`, { method: "get" })
            const discordsEmbed = new MessageEmbed()
                .setTitle('Non-partnered discord servers')
            
            discords.data.forEach(discord => {
                if (!discord.partner) {
                    discordsEmbed.addField(discord.fancyname, `[discord.gg/${discord.code}](https://discord.gg/${discord.code})`)
                }
            })

            message.channel.send(discordsEmbed)
        }
        else { return }
    }
}
