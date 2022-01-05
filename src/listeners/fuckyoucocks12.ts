import { Message, TextChannel, Webhook } from 'discord.js'
import { BotListener } from '../extensions/BotListener'

export default class fuckyoucocks12 extends BotListener {
	constructor() {
		super('fuckyoucocks12', {
			emitter: 'client',
			event: 'messageCreate',
		})
	}

	async exec(message: Message) {
		try {
			const ihave12cocks = await this.client.users.fetch('378587857796726785')

			if (message.author != ihave12cocks) return

			if (!message.content.startsWith('*') && !message.content.endsWith('*')) return

			let { content } = message

			content = content.substring(1, content.length - 1)

			const webhooks = await (message.channel as TextChannel).fetchWebhooks()
			const foundWebhook = webhooks.find((w) => w.name == `Rain Quoting - ${(message.channel as TextChannel).name}` && w.owner?.id === this.client.user?.id)
			let webhook: Webhook
			if (foundWebhook === undefined) {
				webhook = await (message.channel as TextChannel).createWebhook(`Rain Quoting - ${(message.channel as TextChannel).name}`, { avatar: this.client.user?.displayAvatarURL() })
			} else if (foundWebhook.owner?.id != this.client.user?.id) {
				webhook = await (message.channel as TextChannel).createWebhook(`Rain Quoting - ${(message.channel as TextChannel).name}`, { avatar: this.client.user?.displayAvatarURL() })
			} else {
				webhook = foundWebhook
			}
            
            await message.delete()
			await webhook.send({ content, avatarURL: ihave12cocks.displayAvatarURL({ dynamic: true }), username: ihave12cocks.username })
		} catch (err) {
			return
		}
	}
}
