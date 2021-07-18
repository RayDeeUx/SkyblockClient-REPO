import { MessageEmbed } from 'discord.js';
import axios from "axios"
import utils from '../../functions/utils';
import { BotCommand } from '../../extensions/BotCommand';
import fs from 'fs'
import skyclientutils from '../../functions/skyclientutils';

export default class partners extends BotCommand {
    constructor() {
        super('partners', {
            aliases: ['partners'],
            userPermissions: ['ADMINISTRATOR'],

            slash: true,
            slashGuilds: utils.slashGuilds,
            description: 'Sends a list of all the partnered discords, with each one in its own embed (1 embed per message).'
        });
    }

    async exec(message) {
        if (utils.SkyClientGuilds.includes(message.guild.id)) {
            if (!message.member.permissions.has('ADMINISTRATOR')) { return message.reply('hey you need admin for that') }

            const servers = await skyclientutils.getRepo('discords.json')

            
            let embedArray = []

            for (const server of servers.data) {
                if (server.partner) {
                    const partnerEmbed = new MessageEmbed()
                        .setTitle(server.fancyname)
                        .setURL(`https://discord.gg/${server.code}`)
                        .setColor('#00ff00')
                        .setDescription(`${server.description}\n\nDiscord Invite: \`https://discord.gg/${server.code}\``)
                        .setThumbnail(`https://raw.githubusercontent.com/nacrt/SkyblockClient-REPO/main/files/discords/${server.icon}`)

                    embedArray.push(partnerEmbed)
                }
            }

            let msg

            

            // while (embedArray.length > 0) {
            //     msg = embedArray.splice(0, 10)
            //     message.util.reply({ embeds: msg })
            // }

            utils.splitArrayIntoMultiple(embedArray, 10).forEach(embed => {
                message.channel.send({ embeds: embed })
            })

            if (message.interaction) {
                message.interaction.reply({ content: 'Sent partner embeds', ephemeral: true })
            }
        }
    }
}