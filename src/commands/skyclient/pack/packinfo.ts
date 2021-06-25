import { MessageEmbed } from 'discord.js';
import axios from "axios"
import { BotCommand } from '../../../extensions/BotCommand';
import utils from '../../../functions/utils';
import commandManager from '../../../functions/commandManager';

export default class packName extends BotCommand {
    constructor() {
        super('packName', {
            aliases: ['pack', 'packinfo'],
            args: [{id: "pack",type: "string"}],

            slash: true,
            slashGuilds: utils.slashGuilds,
            slashOptions:[{name:'pack', description: 'The ID of the pack you want to get info on', type:'STRING'}],
            description: 'Shows a list of all the mods in SkyClient'
        })
    }

    async exec(message, args) {
        const SkyClientGuilds = [
            `780181693100982273`, //main server
            `824680357936103497` //testing server
        ]
        if (SkyClientGuilds.includes(message.guild.id)) {
            if (!message.interaction) {
                return message.reply('Support for this command as a regular text command has been removed. If you want to use it, there is now a slashcommand for it.')
            }

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
                    if (commandManager.userCanUseCommand(message) == false) {
                        message.interaction.reply({embeds:[embed], ephemeral: true})
                    }
                    else {
                        message.interaction.reply({embeds:[embed]})
                    }
                }
            }
        }
        else { return }


    }
}