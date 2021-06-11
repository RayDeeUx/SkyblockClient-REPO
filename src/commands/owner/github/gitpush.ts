import { exec } from 'child_process';
import { Command } from 'discord-akairo';
import { TextChannel } from 'discord.js';
import { MessageEmbed } from 'discord.js';
import { promisify } from 'util';
import { inspect } from 'util';
import { BotCommand } from '../../../extensions/BotCommand';

const sh = promisify(exec);

export default class gitPush extends BotCommand {
    constructor() {
        super('gitPush', {
            aliases: ['gitpush', 'push'],
            args: [
                {
                    id: 'commitReason',
                    type: 'string',
                    match: 'restContent'
                },
            ],
            ownerOnly: true,
            channel: 'guild'
        });
    }

    async exec(message, args) {
        if (args.commitReason.length > 50) {
            return message.channel.send(`Your commit message is too long!`)
        }

        const pushingToGithubEmbed = new MessageEmbed()
            .setDescription(`Pushing changes to [GitHub](https://github.com/Zordlan/SkyClientBot)`)
        message.channel.send(pushingToGithubEmbed)

        const githubEmbed = new MessageEmbed()
            .setTitle(`Command Output`)

        let gitAdd = await sh('git add .')
        githubEmbed.addField(`\`git add .\``, `\`\`\`js\n${inspect(gitAdd)}\`\`\``)

        let gitCommit = await sh('git commit -m "${args.commitReason}"')
        githubEmbed.addField(`\`git commit "${args.commitReason}"\``, `\`\`\`js\n${inspect(gitCommit)}\`\`\``)

        let githubPush = await sh('git push')
        githubEmbed.addField(`\`git push\``, `\`\`\`js\n${inspect(githubPush)}\`\`\``)

        message.channel.send(githubEmbed)

    }
}
