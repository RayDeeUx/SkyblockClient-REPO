import axios from 'axios';
import { MessageEmbed } from 'discord.js';
import { BotCommand } from '../../extensions/BotCommand';
import utils from '../../functions/utils';
import fs from 'fs'
import skyclientutils from '../../functions/skyclientutils';
import msgutils from '../../functions/msgutils';

export default class nonpartnereddiscords extends BotCommand {
    constructor() {
        super('nonpartnereddiscords', {
            aliases: ['nonpartnereddiscords'],
            args: [{ id: 'type', type: 'string' }],

            slash: true,
            slashGuilds: utils.slashGuilds,
            slashOptions: [
                {
                    name: 'type',
                    description: 'choose between string or embed for how it displays the discords',
                    type: 'STRING',
                    required: false,
                    choices: [
                        { name: 'string', value: 'string' },
                        { name: 'embed', value: 'embed' }
                    ]
                }
            ],
            description: 'Shows a list of all of the not partnered discord servers for mods and packs in SkyClient'
        })
    }

    async exec(message, args) {
        if (utils.SkyClientGuilds.includes(message.guild.id)) {

            const discords = await skyclientutils.getRepo('discords.json')

            const discordsEmbed = new MessageEmbed()
                .setTitle('Non-partnered discord servers')

            let discordString = ''

            discords.forEach(discord => {
                if (!discord.partner) {
                    discordsEmbed.setColor(message.member.displayColor)
                    discordsEmbed.addField(discord.fancyname, `[discord.gg/${discord.code}](https://discord.gg/${discord.code})`)
                    discordString = discordString + `discord.gg/${discord.code}\n`
                }
            })

            if (!args.type) {
                await msgutils.reply(message, { embeds: [discordsEmbed] })
            }
            if (args.type && args.type.toLowerCase() == 'string') {
                await msgutils.reply(message, { content: discordString })
            }
            if (args.type && args.type.toLowerCase() == 'embed') {
                await msgutils.reply(message, { embeds: [discordsEmbed] })
            }
            if (args.type && args.type.toLowerCase() != 'string' && args.type.toLowerCase() != 'embed') {
                await msgutils.reply(message, { content: 'That isn\'t a valid type!\nValid types: `embed`, `string`' })
            }
        }
    }
}
