import { MessageEmbed } from 'discord.js'
import { BotCommand } from '../extensions/BotCommand'
import utils from '../functions/utils'

export default class info extends BotCommand {
	constructor() {
		super('info', {
			aliases: ['info'],
			args: [{ id: 'ephemeral', type: 'boolean', default: 'false' }],

			slash: true,
			description: 'info about the bot',
			slashOptions: [
				{
					name: 'ephemeral',
					description: 'ephemeral or not ephemeral',
					type: 'BOOLEAN',
				},
			],
		})
	}

	async exec(message, args) {
		//e
	}
}
