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
            slashOptions:[{name:'discord', description: 'The ID (neu, sba, things like that) of the discord server you want to get info on', type:'STRING'}],
            description: 'Shows info on a specific discord server in SkyClient'
        });
    }

    async exec(message, args) {
        const SkyClientGuilds = [
            `780181693100982273`, //main server
            `824680357936103497` //testing server
        ]
        if (SkyClientGuilds.includes(message.guild.id)) {
            const discords = await axios(`https://raw.githubusercontent.com/nacrt/SkyblockClient-REPO/main/files/discords.json`, { method: "get" })
            let found = false

            for (const discord of discords.data) {
                discord.nicknames.forEach(nickname => {
                    if (args.discord == nickname && found == false || args.discord == discord.id && found == false) {
                        if (discord.partner) {
                            const partnerEmbed = new MessageEmbed()
                                .setTitle(discord.fancyname)
                                .setURL(`https://discord.gg/${discord.code}`)
                                .setColor(message.member.displayColor)
                                .setDescription(`${discord.description}\n\nDiscord Invite: \`https://discord.gg/${discord.code}\``)
                                .setThumbnail(`https://raw.githubusercontent.com/nacrt/SkyblockClient-REPO/main/files/discords/${discord.icon}`)

                            message.channel.send({content:`discord.gg/${discord.code}`, embeds:[partnerEmbed]})
                        }
                        else {
                            message.channel.send(`discord.gg/${discord.code}`)
                        }
                        found = true
                    }
                })
            }
        }
        else { return }
    }
}