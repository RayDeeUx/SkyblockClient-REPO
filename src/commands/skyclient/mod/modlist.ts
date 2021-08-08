import { MessageEmbed } from 'discord.js';
import axios from "axios"
import { BotCommand } from '../../../extensions/BotCommand';
import commandManager from '../../../functions/commandManager';
import fs from 'fs'


import importUtils from '../../../functions/utils'
import skyclientutils from '../../../functions/skyclientutils';
import msgutils from '../../../functions/msgutils';
const utils = importUtils

export default class modList extends BotCommand {
    constructor() {
        super('modList', {
            aliases: ['modlist', 'mods'],

            slashOptions:[],
            slash: true,
            slashGuilds: utils.slashGuilds,
            description: 'Shows a list of all the mods in SkyClient',
        });
    }

    async exec(message, args) {
        if (utils.SkyClientGuilds.includes(message.guild.id)) {

            let mods = await skyclientutils.getRepo('mods.json')

            const modsEmbed = new MessageEmbed()
                .setColor(message.member.displayColor)
                .setTitle('SkyClien\'t Mods List')

            mods.forEach(mod => {
                if (mod.display && mod.display != "no" && mod.hidden != true) {
                    let mods = ""

                    if (mod.display.includes("Bundle")) {
                        mod.actions.forEach(bundle => {

                            if (bundle.text && bundle.text != "Guide") {
                                mods = mods + bundle.text + ", "
                            }
                        });
                        mods = mods.substring(0, mods.length - 2)
                    }
                    else {

                        if (mod.display && mod.creator && mod.display != "no" && mod.discordcode) {
                            mods = `Creator: [${mod.creator}](https://discord.gg/${mod.discordcode})\nMod ID: \`${mod.id}\``
                        }
                        else {
                            mods = `Creator: ${mod.creator}\nMod ID: \`${mod.id}\``
                        }
                    }

                    modsEmbed.addField(`${mod.display}`, mods, true)
                }
            })


            const embed = modsEmbed
            await msgutils.reply(message, { embeds: [embed] })

        }
        else { return }
    }
}
