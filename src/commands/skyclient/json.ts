import axios from 'axios'
import { BotCommand } from '../../extensions/BotCommand'
import utils from '../../functions/utils'
import fs from 'fs'
import skyclientutils from '../../functions/skyclientutils'
import msgutils from '../../functions/msgutils'

export default class json extends BotCommand {
	constructor() {
		super('json', {
			aliases: ['json'],
			args: [
				{ id: 'type', type: 'string' },
				{ id: 'thingtofind', match: 'restContent', type: 'string' },
			],
			SkyClientOnly: true,

			slash: true,
			slashGuilds: utils.SkyClientGuilds,
			description: 'Sends a hastebin link to the raw json from our repo for a mod or pack.',
			slashOptions: [
				{
					name: 'type',
					description: 'The type of thing to get the raw data of.',
					type: 'STRING',
					choices: [
						{
							name: 'mod',
							value: 'mod',
						},
						{
							name: 'resource pack',
							value: 'pack',
						},
						{
							name: 'user',
							value: 'user',
						},
						{
							name: 'channel',
							value: 'channel',
						},
						{
							name: 'repo discord server',
							value: 'discord',
						},
					],
					required: true,
				},
				{
					name: 'query',
					description: 'option',
					type: 'STRING',
					required: true,
				},
			],
		})
	}

	async exec(message, args) {
		if (args.type == 'mod') {
			let modJson = await skyclientutils.getRepo('mods.json')

			for (let mod of modJson) {
				if (mod.id == args.query) {
					mod = JSON.stringify(mod, null, '  ')
					await msgutils.reply(message, { content: await this.generateOutput(mod) })
				}
			}
		} else if (args.type == 'pack') {
			let packJson = await skyclientutils.getRepo('packs.json')

			for (let pack of packJson) {
				if (pack.id == args.query) {
					pack = JSON.stringify(pack, null, '  ')
					await msgutils.reply(message, { content: await this.generateOutput(pack) })
				}
			}
		} else if (args.type == 'user') {
			const user = await this.client.util.resolveUser(args.query, this.client.users.cache)

			const stringUser = JSON.stringify(user, null, '  ')
			await msgutils.reply(message, { content: await this.generateOutput(stringUser) })
		} else if (args.type == 'channel') {
			const channel = await this.client.util.resolveChannel(args.query, message.guild.channels.cache)

			const stringChannel = JSON.stringify(channel, null, '  ')
			await msgutils.reply(message, { content: await this.generateOutput(stringChannel) })
		} else if (args.type === 'discord') {
			let discords = await skyclientutils.getRepo('discords.json')

			for (let discord of discords) {
				if (discord.id == args.query) {
					discord = JSON.stringify(discord, null, '  ')
					await msgutils.reply(message, { content: await this.generateOutput(discord) })
				}
			}
		}
	}

	async generateOutput(content: string): Promise<string> {
		if (content.length >= 10) {
			return `\`\`\`json\n${content}\`\`\``
		} else {
			return await utils.haste(content)
		}
	}
}
