import axios from 'axios';
import { MessageEmbed } from 'discord.js';
import { BotCommand } from '../../extensions/BotCommand';
import utils from '../../functions/utils';

export default class nonpartnereddiscords extends BotCommand {
    constructor() {
        super('nonpartnereddiscords', {
            aliases: ['nonpartnereddiscords'],
            args: [{id: 'type', type: 'string'}],

            slash: true,
            slashGuilds: utils.slashGuilds,
            slashOptions:[
                {
                    name:'type', 
                    description: 'choose between string or embed for how it displays the discords', 
                    type:'STRING',
                    required:false,
                    choices:[
                        {name:'string',value:'string'},
                        {name:'embed',value:'embed'}
                    ]
                }
            ],
            description: 'Shows a list of all of the not partnered discord servers for mods and packs in SkyClient'
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
                    discordsEmbed.setColor(message.member.displayColor)
                    discordsEmbed.addField(discord.fancyname, `[discord.gg/${discord.code}](https://discord.gg/${discord.code})`)
                    discordString = discordString+`discord.gg/${discord.code}\n`
                }
            })

            if (!args.type) {
                message.reply({embeds:[discordsEmbed]})
            }
            if (args.type && args.type.toLowerCase() == 'string') {
                message.reply(discordString)
            }
            if (args.type && args.type.toLowerCase() == 'embed') {
                message.reply({embeds:[discordsEmbed]})
            }
            if (args.type && args.type.toLowerCase() != 'string' && args.type.toLowerCase() != 'embed') {
                message.reply('That isn\'t a valid type!\nValid types: `embed`, `string`')
            }
        }
        else { return }
    }
}
