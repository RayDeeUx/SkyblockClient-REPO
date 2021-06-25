import chalk from 'chalk';
import { exec } from 'child_process';
import { MessageEmbed } from 'discord.js';
import { promisify } from 'util';
import { inspect } from 'util';
import { BotCommand } from '../../extensions/BotCommand';
import utils from '../../functions/utils'

const sh = promisify(exec);

export default class evaluate extends BotCommand {
    constructor() {
        super('eval', {
            aliases: ['eval', 'ev', 'exec'],
            args: [
                { id: 'codetoeval', type: 'string', match: 'rest' },
                { id: "silent", match: 'flag', flag: '--silent', },
                { id: 'sudo', match: 'flag', flag: '--sudo' }
            ],
            ownerOnly: true,
            channel: 'guild'
        });
    }

    async exec(message, args) {
        try {
            if (args.codetoeval.includes('token')) {
                return (message.util.reply('no token'))
            }
            if (args.codetoeval.includes('env')) {
                return message.util.reply('no env')
            }

            if (args.codetoeval.includes('message.channel.delete')) {
                return message.util.reply('Are you IRONM00N?')
            }
            if (args.codetoeval.includes('message.guild.delete')) {
                return message.util.reply('You\'re like IRONM00N but infinitely more stupid!')
            }
            if (args.codetoeval.includes('delete') && !args.sudo) {
                return message.util.reply('This would be blocked by smooth brain protection, but BushBot has a license')
            }

            let guild = message.guild
            let client = this.client
            let channel = message.channel
            let user = message.author
            let member = message.member
            let botUser = this.client.user
            let botMember = message.guild.me

            let embed1 = new MessageEmbed()
            let embed2 = new MessageEmbed()
            let embed3 = new MessageEmbed()
            let embed4 = new MessageEmbed()
            let embed5 = new MessageEmbed()
            let embed6 = new MessageEmbed()
            let embed7 = new MessageEmbed()
            let embed8 = new MessageEmbed()
            let embed9 = new MessageEmbed()
            let embed10 = new MessageEmbed()

            let output = await eval(args.codetoeval)

            if (inspect(output).includes(process.env.token)) {
                return message.util.reply('Message containing token wasn\'t sent.')
            }

            if (message.guild.id == '794610828317032458' && message.channel.id != '834878498941829181') {
                if (args.codetoeval.includes('message.delete')) {
                    return
                }
                return message.react('<:success:838816341007269908>')
            }

            if (!args.silent && !args.codetoeval.includes('message.channel.delete()')) {
                const evalOutputEmbed = new MessageEmbed()
                    .setTitle('Evaluated Code')
                    .addField(':inbox_tray: **Input**', `\`\`\`js\n${args.codetoeval}\`\`\``)

                if (inspect(output, { depth: 0 }).length > 1000) {
                    await evalOutputEmbed.addField(':outbox_tray: **Output**', await utils.haste(inspect(output)))
                }
                else {
                    evalOutputEmbed.addField(':outbox_tray: **Output**', `\`\`\`js\n${inspect(output, { depth: 0 })}\`\`\``)
                }

                await message.util.send({embeds:[evalOutputEmbed]})
            }
            if (args.silent) {
                if (args.codetoeval.includes('message.delete')) {
                    return
                }
                message.react('<:green_check:796548440266899526>')
            }
        }
        catch (err) {
            try { utils.errorhandling(err, message) }
            catch (err) {
                utils.errorchannelsend(err)
            }
        }
    }
}
