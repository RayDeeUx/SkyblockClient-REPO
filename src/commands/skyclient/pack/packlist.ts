import { MessageEmbed } from 'discord.js';
import axios from "axios"
import { BotCommand } from '../../../extensions/BotCommand';
import commandManager from '../../../functions/commandManager';
import fs from 'fs'


import importUtils from '../../../functions/utils'
import skyclientutils from '../../../functions/skyclientutils';
const utils = importUtils

export default class packList extends BotCommand {
    constructor() {
        super('packList', {
            aliases: ['packlist', 'packs'],

            slash: true,
            slashGuilds: utils.slashGuilds,
            description: 'Shows a list of all the packs in SkyClient',
            slashOptions: [{ name: 'ephemeral', description: 'Whether or not you want the output to be ephemeral', type: 'BOOLEAN', required: false }]
        });
    }

    async exec(message, args) {
        if (utils.SkyClientGuilds.includes(message.guild.id)) {

            let packJson = await skyclientutils.getRepo('packs.json')
            
            const packsEmbed = new MessageEmbed()
                .setColor(message.member.displayColor)
                .setTitle('SkyClien\'t packs List')

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
            if (commandManager.userCanUseCommand(message) == false && message.interaction) {
                message.interaction.reply({ embeds: [embed], ephemeral: true })
            }
            else if (message.interaction && commandManager.userCanUseCommand(message) == true && args.ephemeral) {
                message.interaction.reply({ embeds: [embed], ephemeral: true })
            }
            else if (message.interaction && commandManager.userCanUseCommand(message) == true && !args.ephemeral) {
                message.interaction.reply({ embeds: [embed] })
            }
            else if (!message.interaction && commandManager.userCanUseCommand(message) == true) {
                message.util.reply({ embeds: [embed] })
            }
            else if (!message.interaction && commandManager.userCanUseCommand(message) == false) {
                message.util.reply('Please use this as a slashcommand if you want to use it in this channel.')
            }
        }
        else { return }
    }
}