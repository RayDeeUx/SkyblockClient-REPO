import { BotCommand } from '../../extensions/BotCommand'
import utils from '../../functions/utils'
import fs from 'fs'

export default class templateSkyclientCommand extends BotCommand {
	constructor() {
		super('templateSkyclientCommand', {
			aliases: ['templateSkyclientCommand'],
			channel: 'guild',
		})
	}

	async exec(message) {
		if (utils.SkyClientGuilds.includes(message.guild.id)) {
			message.util.reply(`This is a SkyClient server!`)
		} else {
			message.util.send(`e`)
		}
	}
}
