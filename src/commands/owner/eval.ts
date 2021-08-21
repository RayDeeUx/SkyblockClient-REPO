/* eslint-disable @typescript-eslint/no-unused-vars */
import chalk from 'chalk'
import { exec } from 'child_process'
import { Guild, Message, MessageActionRow, MessageButton, MessageEmbed } from 'discord.js'
import { promisify, inspect } from 'util'
import { BotCommand } from '../../extensions/BotCommand'

import importUtils from '../../functions/utils'
const utils = importUtils

import importScutils from '../../functions/skyclientutils'
const scutils = importScutils

import importAxios from 'axios'
const axios = importAxios

const sh = promisify(exec);

import importMs from 'ms'
const ms = importMs

export default class evaluate extends BotCommand {
    constructor() {
        super('eval', {
            aliases: ['eval', 'ev', 'exec'],
            args: [
                { id: 'codetoeval', type: 'string', match: 'rest' },
                { id: 'silent', match: 'flag', flag: '--silent', },
                { id: 'sudo', match: 'flag', flag: '--sudo' }
            ],
            ownerOnly: true,
            description: 'run code',
        })
    }

    async exec(message: Message, args: any) {
        //if (message.author.id != '492488074442309642') {return message.reply('no u')}

        if (args.codetoeval.includes('channel.delete')) { return message.reply('Are you IRONM00N?') }
        if (args.codetoeval.includes('message.guild.delete')) { return message.reply('You\'re like IRONM00N but infinitely more stupid!') }
        if (args.codetoeval.includes('delete') && !args.sudo) { return message.reply('This would be blocked by smooth brain protection, but BushBot has a license') }

        const guild = message.guild
        const client = this.client
        const channel = message.channel
        const embed = new MessageEmbed()
        const user = message.author
        const member = message.member
        const botUser = this.client.user
        const botMember = guild.me

        let output

        try {
            output = await eval(`(async () => {${args.codetoeval}})()`)
            output = inspect(output, { depth: 0 })
        }
        catch (err) {
            const errorStack = err.stack.substring(0, 1000)

            output = utils.censorString(errorStack)
        }

        output = utils.censorString(output)

        const evalEmbedDisabledGuilds = [
            '794610828317032458'
        ]
        const evalDisabledGuildChannelBypass = [
            '834878498941829181'
        ]

        if (evalEmbedDisabledGuilds.includes(message.guild!.id) && !evalDisabledGuildChannelBypass.includes(message.channel.id)) {
            if (args.codetoeval.includes('message.delete')) { return }
            else { return message.react('<:success:838816341007269908>') }
        }


        if (!args.silent && !args.codetoeval.includes('message.channel.delete()')) {
            const evalOutputEmbed = new MessageEmbed()
                .setTitle('Evaluated Code')
                .addField(':inbox_tray: **Input**', `\`\`\`js\n${args.codetoeval}\`\`\``)
                //.setColor(message.member!.displayColor)

            output = `\`\`\`js\n${output}\`\`\``

            if (output.length > 900) {
                const haste = await utils.haste(utils.censorString(output))
                output = output.substring(0, 900)
                output = output + `\`\`\`\nThe output was too large to display, so it was uploaded to [hastebin](${haste})`
            }

            evalOutputEmbed.addField(':outbox_tray: **Output**', utils.censorString(output))

            //@ts-ignore strict mode bad this will exist
            if (!message.interaction){await message.util.reply({ embeds: [evalOutputEmbed] })}
            if (message.interaction){await message.reply({ embeds: [evalOutputEmbed] })}
        }
        if (args.silent && !message.interaction) {
            if (args.codetoeval.includes('message.delete')) { return }
            message.react('<:success:838816341007269908>')
        }
        else if (args.silent && message.interaction) {
            //@ts-ignore fuck strict mode lol
            return message.reply({content:'i can\'t really send nothing', ephemeral:true})
        }
    }
}