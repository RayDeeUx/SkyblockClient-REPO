import { MessageEmbed } from 'discord.js';
import axios from "axios"
import { BotCommand } from '../../../extensions/BotCommand';
import utils from '../../../functions/utils';
import commandManager from '../../../functions/commandManager';

export default class packList extends BotCommand {
    constructor() {
        super('packList', {
            aliases: ['packlist', 'packs'],

            slash: true,
            slashGuilds: utils.slashGuilds,
            description: 'Shows a list of all the packs in SkyClient'
        });
    }

    async exec(message) {
        if (utils.SkyClientGuilds.includes(message.guild.id)) {
            if (!message.interaction) {
                return message.reply('Support for this command as a regular text command has been removed. If you want to use it, there is now a slashcommand for it.')
            }

            const packJson = await axios(`https://raw.githubusercontent.com/nacrt/SkyblockClient-REPO/main/files/packs.json`, { method: "get" })

            const packsEmbed = new MessageEmbed()
            .setColor(message.member.displayColor)
            .setTitle('SkyClient packs List')

                packJson.data.forEach(pack => {
                if (pack.display && pack.display != "no" && pack.hidden != true) {
                    let packs = ""

                    if (pack.display.includes("Bundle")) {
                        pack.actions.forEach(bundle => {

                            if (bundle.text && bundle.text != "Guide") {
                                packs = packs + bundle.text + ", "
                            }
                        });
                        packs = packs.substring(0, packs.length - 2)
                    }
                    else {
                        if (pack.display && pack.creator && pack.display != "no" && pack.discordcode) {
                            packs = `Creator: [${pack.creator}](https://discord.gg/${pack.discordcode})\npack ID: \`${pack.id}\``
                        }
                        else {
                            packs = `Creator: ${pack.creator}\npack ID: \`${pack.id}\``
                        }
                    }

                    packsEmbed.addField(`${pack.display}`, packs, true)

                }
            });
            const embed = packsEmbed
            if (commandManager.userCanUseCommand(message) == false) {
                message.interaction.reply({embeds:[embed], ephemeral: true})
            }
            else {
                message.interaction.reply({embeds:[embed]})
            }
        }
        else {return}
    }
}