import { Command } from 'discord-akairo';
import { MessageEmbed } from 'discord.js';
import axios from "axios"
import utils from '../../functions/utils';
import { BotCommand } from '../../extensions/BotCommand';

export default class rules extends BotCommand {
    constructor() {
        super('rules', {
            aliases: ['rules'],
            userPermissions: ['ADMINISTRATOR'],
        });
    }

    async exec(message) {
        const SkyClientGuilds = [
            `780181693100982273`, //main server
            `824680357936103497` //testing server
        ]
        if (SkyClientGuilds.includes(message.guild.id)) {
            const rule1 = new MessageEmbed()
                .setTitle(`Don't be an idiot.`)
                .setDescription(`If you don't have common sense, then please just leave.`)

            const rule2 = new MessageEmbed()
                .setTitle(`Things you should already know`)
                .addFields(
                    {name: `Don't discriminate against people`, value: `Everyone is a human, and has equal rights. If you disagree with that, then you don't get to be here.`},
                    {name: `Politics`, value: `If you want to talk about politics, do it somewhere else. It just causes unnecessary drama, which we don't need here.`},
                    {name: `Advertising is bad`, value: `Don't do it. Nobody likes advertising.`},
                    {name: `No NSFW Content`, value: `do I really need to explain this one? No porn, etc`},
                )
        }
        else { return }
    }
}