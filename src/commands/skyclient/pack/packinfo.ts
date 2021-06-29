import { MessageEmbed } from 'discord.js';
import axios from "axios"
import { BotCommand } from '../../../extensions/BotCommand';
import utils from '../../../functions/utils';
import commandManager from '../../../functions/commandManager';

export default class packName extends BotCommand {
    constructor() {
        super('packName', {
            aliases: ['pack', 'packinfo'],
            args: [{ id: "pack", type: "string" }],

            slash: true,
            slashGuilds: utils.slashGuilds,
            slashOptions: [
                { name: 'pack', description: 'The ID of the pack you want to get info on', type: 'STRING' },
                { name: 'ephemeral', description: 'Whether or not you want the output to be ephemeral', type: 'BOOLEAN', required: false }
            ],
            description: 'Shows a list of all the mods in SkyClient'
        })
    }

    async exec(message, args) {

        if (utils.SkyClientGuilds.includes(message.guild.id)) {

            let packDownloadURL
            const packJson = await axios(`https://raw.githubusercontent.com/nacrt/SkyblockClient-REPO/main/files/packs.json`, { method: "get" })

            for (const pack of packJson.data) {
                if (pack.id == args.pack) {
                    const packEmbed = new MessageEmbed()
                        .setTitle(pack.display)
                        .setColor(message.member.displayColor)
                    if (pack.discordcode) {
                        packEmbed.setURL(`https://discord.gg/${pack.discordcode}`)
                    }

                    let filteredPackFileName = pack.file.replace(/ /g, '%20')
                    if (!pack.url) {
                        packDownloadURL = `https://github.com/nacrt/SkyblockClient-REPO/blob/main/files/packs/${filteredPackFileName}?raw=true`
                    }
                    else { packDownloadURL = pack.url }
                    packEmbed.addFields(
                        { name: 'Description', value: pack.description },
                        { name: 'Direct Download', value: `[${filteredPackFileName}](${packDownloadURL})` },
                    )
                    if (pack.command) {
                        packEmbed.addField(`Main Command`, `\`${pack.command}\``)
                    }

                    let icon = pack.icon
                    icon = icon.replace(/ /g, '%20')

                    packEmbed.setThumbnail(`https://raw.githubusercontent.com/nacrt/SkyblockClient-REPO/main/files/icons/${icon}`)
                    if (pack.creator) {
                        packEmbed.setFooter(`Created by ${pack.creator}`)
                    }

                    const embed = packEmbed
                    if (commandManager.userCanUseCommand(message) == false && message.interaction) {
                        message.interaction.reply({ embeds: [embed], ephemeral: true })
                    }
                    else if (message.interaction && commandManager.userCanUseCommand(message) == true) {
                        message.interaction.reply({ embeds: [embed] })
                    }
                    else if (message.interaction && commandManager.userCanUseCommand(message) == true && args.ephemeral == true) {
                        message.interaction.reply({ embeds: [embed], ephemeral: true })
                    }
                    else if (!message.interaction && commandManager.userCanUseCommand(message) == true) {
                        if (message.type == 'REPLY') {
                            if (message.channel.type == 'text') {
                                const repliedMessage = await message.channel.messages.fetch(message.reference.messageID)
                                repliedMessage.util.reply({ embeds: [embed], allowedMentions: { repliedUser: true } })
                            }
                        }
                        else {
                            message.util.reply({ embeds: [embed] })
                        }
                    }
                    else if (!message.interaction && commandManager.userCanUseCommand(message) == false) {
                        message.util.reply('Please use this as a slashcommand if you want to use it in this channel.')
                    }
                }
            }
        }
        else { return }


    }
}