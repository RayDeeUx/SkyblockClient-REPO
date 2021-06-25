import { MessageEmbed } from 'discord.js';
import axios from "axios"
import { BotCommand } from '../../../extensions/BotCommand';
import utils from '../../../functions/utils';
import commandManager from '../../../functions/commandManager';

export default class modList extends BotCommand {
    constructor() {
        super('modList', {
            aliases: ['modlist', 'mods'],

            slash: true,
            slashGuilds: utils.slashGuilds,
            description: 'Shows a list of all the mods in SkyClient'
        });
    }

    async exec(message) {
        if (utils.SkyClientGuilds.includes(message.guild.id)) {
            if (!message.interaction) {
                return message.reply('Support for this command as a regular text command has been removed. If you want to use it, there is now a slashcommand for it.')
            }

            const modJson = await axios(`https://raw.githubusercontent.com/nacrt/SkyblockClient-REPO/main/files/mods.json`, { method: "get" })

            const modsEmbed = new MessageEmbed()
            .setColor(message.member.displayColor)
            .setTitle('SkyClient Mods List')

                modJson.data.forEach(mod => {
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
            });


            const embed = modsEmbed
            if (commandManager.userCanUseCommand(message) == false) {
                message.interaction.reply({embeds:[embed], ephemeral: true})
            }
            else {
                message.interaction.reply({embeds:[embed]})
            }
        }
        else { return }
    }
}