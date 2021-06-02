import { Command } from 'discord-akairo';
import { MessageEmbed } from 'discord.js';
import axios from "axios"
import utils from '../../functions/utils';
import { BotCommand } from '../../extensions/BotCommand';

export default class partners extends BotCommand {
    constructor() {
        super('partners', {
            aliases: ['partners'],
            userPermissions: ['ADMINISTRATOR'],
        });
    }

    async exec(message) {
        const SkyClientGuilds = [
            `780181693100982273`, //main server
            `824680357936103497` //testing server
        ]
        if (SkyClientGuilds.includes(message.guild.id)) {
            const res = await axios(`https://raw.githubusercontent.com/nacrt/SkyblockClient-REPO/main/files/discords.json`, { method: "get" })

            for (const server of res.data) {

                if (server.partner) {
                    const partnerEmbed = new MessageEmbed()
                        .setTitle(server.fancyname)
                        .setURL(`https://discord.gg/${server.code}`)
                        .setColor(`00ff00`)
                        .setDescription(`${server.description}\n\nDiscord Invite: \`https://discord.gg/${server.code}\``)
                        .setThumbnail(`https://raw.githubusercontent.com/nacrt/SkyblockClient-REPO/main/files/discords/${server.icon}`)

                    await utils.sleep(1000)
                    await message.channel.send(partnerEmbed)
                }
            }
        }
        else {return}
    }
}