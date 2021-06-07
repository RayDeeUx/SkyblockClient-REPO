import { exec } from 'child_process';
import { Command } from 'discord-akairo';
import { MessageEmbed } from 'discord.js';
import { inspect, promisify } from 'util';
import { BotCommand } from '../../../extensions/BotCommand';

const sh = promisify(exec);

export default class gitPull extends BotCommand {
    constructor() {
        super('gitPull', {
            aliases: ['gitpull', 'pull'],
            ownerOnly: true,
            channel: 'guild'
        });
    }

    async exec(message, args) {
        const githubEmbed = new MessageEmbed()

        let pull = await eval(`sh('git pull')`)
        githubEmbed.setDescription(`\`\`\`js\n${inspect(pull)}\`\`\``)

        message.channel.send(githubEmbed)

    }
}
