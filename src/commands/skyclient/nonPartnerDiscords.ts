import axios from 'axios';
import { MessageEmbed } from 'discord.js';
import { BotCommand } from '../../extensions/BotCommand';

export default class nonPartneredDiscords extends BotCommand {
    constructor() {
        super('nonPartneredDiscords', {
            aliases: ['nonPartneredDiscords'],
            args: [{id: 'type', type: 'string'}]
        })
    }

    async exec(message, args) {
        const SkyClientGuilds = [
            `780181693100982273`, //main server
            `824680357936103497` //testing server
        ]
        if (SkyClientGuilds.includes(message.guild.id)) {
            const discords = await axios(`https://raw.githubusercontent.com/nacrt/SkyblockClient-REPO/main/files/discords.json`, { method: "get" })
            const discordsEmbed = new MessageEmbed()
                .setTitle('Non-partnered discord servers')

            let discordString = new String
            
            discords.data.forEach(discord => {
                if (!discord.partner) {
                    discordsEmbed.addField(discord.fancyname, `[discord.gg/${discord.code}](https://discord.gg/${discord.code})`)
                    discordString = discordString+`discord.gg/${discord.code}\n`
                }
            })

            if (!args.type) {
                message.channel.send(discordsEmbed)
            }
            if (args.type && args.type.toLowerCase() == 'string') {
                message.channel.send(discordString)
            }
            if (args.type && args.type.toLowerCase() == 'embed') {
                message.channel.send(discordsEmbed)
            }
            if (args.type && args.type.toLowerCase() != 'string' && args.type.toLowerCase() != 'embed') {
                message.channel.send('That isn\'t a valid type!\nValid types: `embed`, `string`')
            }
        }
        else { return }
    }
}
