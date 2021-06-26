import { MessageEmbed } from 'discord.js';
import axios from "axios"
import { BotCommand } from '../../extensions/BotCommand';
import utils from '../../functions/utils';

export default class discord extends BotCommand {
    constructor() {
        super('discord', {
            aliases: ['discord'],
            args: [{ id: "discord", type: "string" }],

            slash: true,
            slashGuilds: utils.slashGuilds,
            slashOptions: [{ name: 'discord', description: 'The ID (neu, sba, things like that) of the discord server you want to get info on', type: 'STRING' }],
            description: 'Shows info about a specific discord server in SkyClient'
        });
    }

    async exec(message, args) {
        if (utils.SkyClientGuilds.includes(message.guild.id)) {
            const discords = await axios(`https://raw.githubusercontent.com/nacrt/SkyblockClient-REPO/main/files/discords.json`, { method: "get" })
            let found = false

            for (const discord of discords.data) {
                discord.nicknames.forEach(async nickname => {
                    if (args.discord == nickname && found == false || args.discord == discord.id && found == false) {
                        if (discord.partner) {
                            const partnerEmbed = new MessageEmbed()
                                .setTitle(discord.fancyname)
                                .setURL(`https://discord.gg/${discord.code}`)
                                .setColor(message.member.displayColor)
                                .setDescription(`${discord.description}\n\nDiscord Invite: \`https://discord.gg/${discord.code}\``)
                                .setThumbnail(`https://raw.githubusercontent.com/nacrt/SkyblockClient-REPO/main/files/discords/${discord.icon}`)

                            if (message.type == 'REPLY') {
                                if (message.channel.type == 'text') {
                                    const repliedMessage = await message.channel.messages.fetch(message.reference.messageID)
                                    repliedMessage.reply({ content: `discord.gg/${discord.code}`, embeds: [partnerEmbed], allowedMentions: { repliedUser: true } })
                                }
                            }
                            else {
                                message.reply({ content: `discord.gg/${discord.code}`, embeds: [partnerEmbed] })
                            }
                        }
                        else {
                            if (message.type == 'REPLY') {
                                if (message.channel.type == 'text') {
                                    const repliedMessage = await message.channel.messages.fetch(message.reference.messageID)
                                    repliedMessage.reply({ content: `discord.gg/${discord.code}`, allowedMentions: { repliedUser: true } })
                                }
                            }
                            else {
                                message.reply(`discord.gg/${discord.code}`)
                            }
                        }
                        found = true
                    }
                })
            }
        }
        else { return }
    }
}