import { MessageEmbed } from 'discord.js';
import axios from "axios"
import { BotCommand } from '../../extensions/BotCommand';

export default class discord extends BotCommand {
    constructor() {
        super('discord', {
            aliases: ['discord'],
            args: [
                { id: "discordServer", type: "string" }
            ]
        });
    }

    async exec(message, args) {
        const SkyClientGuilds = [
            `780181693100982273`, //main server
            `824680357936103497` //testing server
        ]
        if (SkyClientGuilds.includes(message.guild.id)) {
            const res = await axios(`https://raw.githubusercontent.com/nacrt/SkyblockClient-REPO/main/files/discords.json`, { method: "get" })
            let found = false

            for (const discord of res.data) {
                discord.nicknames.forEach(nickname => {
                    if (args.discordServer == nickname && found == false || args.discordServer == discord.id && found == false) {
                        if (discord.partner) {
                            const partnerEmbed = new MessageEmbed()
                                .setTitle(discord.fancyname)
                                .setURL(`https://discord.gg/${discord.code}`)
                                .setColor(`00ff00`)
                                .setDescription(`${discord.description}\n\nDiscord Invite: \`https://discord.gg/${discord.code}\``)
                                .setThumbnail(`https://raw.githubusercontent.com/nacrt/SkyblockClient-REPO/main/files/discords/${discord.icon}`)

                            message.channel.send(`discord.gg/${discord.code}`, partnerEmbed)
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