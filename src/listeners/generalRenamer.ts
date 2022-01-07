import { Message, TextChannel, WebhookClient } from 'discord.js'
import { BotListener } from '../extensions/BotListener'
import utils from '../functions/utils'

export default class GeneralRenamer extends BotListener {
	constructor() {
		super('generalRenamer', {
			emitter: 'client',
			event: 'messageCreate',
		})
	}

	async exec(message: Message) {
		try {
			if (message.member.roles.cache.get('929157720328785920')) return

			if (message.channel.id != '780181693553704973') return
			if (!message.content) return
			if (message.content.replaceAll(' ', '').length! >= 7) return
			if (this.client.generalTimeout != 0) return

			await (message.channel as TextChannel).setName(message.content)
			const webhook = new WebhookClient({ url: this.client.config.misc.skyclientGeneralLoggingURL })
			await webhook.send(`Renaming SkyClient #general to ${message.content.replaceAll(' ', '-')} - ${message.url}`)

			this.client.generalTimeout = 5
			await utils.sleep(300000)
			this.client.generalTimeout = 0
		} catch (err) {
			await message.reply(err.message)
		}
	}
}
