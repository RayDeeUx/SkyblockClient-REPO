import { Command } from 'discord-akairo';
import { MessageEmbed } from 'discord.js';
import axios from "axios"
import utils from '../../functions/utils';
import { BotCommand } from '../../extensions/BotCommand';

export default class issue extends BotCommand {
    constructor() {
        super('issue', {
            aliases: ['issue'],
            args: [
                { id: "issue", type: "string" }
            ]
        });
    }

    async exec(message, args) {
        const SkyClientGuilds = [
            `780181693100982273`, //main server
            `824680357936103497` //testing server
        ]
        if (SkyClientGuilds.includes(message.guild.id)) {
            if (args.issue.toLowerCase() == `windowsbad`) {
                const fuckyouwindows = new MessageEmbed()
                    .setTitle(`THIS IS NOT A PROBLEM`)
                    .setDescription(`To remove this error, we would have to pay $300 to Microsoft, which none of the devs can afford or are willing to pay.\n\nJust press \`More Info\`, then \`Run Anyways\` to run it.`)
                    .setImage(`https://cdn.discordapp.com/attachments/780181693553704973/796869759190827108/unknown.png`)
                message.channel.send(fuckyouwindows)
            }
            if (args.issue.toLowerCase() == `labybad`) {
                const fuckyoulaby = new MessageEmbed()
                    .setTitle(`LabyMod is bad`)
                    .setDescription(`LabyMod is terribly designed. If you want to get other mods that do what it does but better, check out https://proudmuslim.tech/bad-mod-alternatives/labymod.html, or https://5zigreborn.eu/downloads/`)
                message.channel.send(fuckyoulaby)
            }
        }
        else { return }
    }
}