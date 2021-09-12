import { BotListener } from '../../extensions/BotListener'

export default class commandErrorListener extends BotListener {
	constructor() {
		super('commandErrorListener', {
			emitter: 'commandHandler',
			event: 'error',
		})
	}
	async exec(error, message) {
		if (this.client.ownerID.includes(message.author.id) || this.client.ownerID.includes(message.user.id)) {
			message.reply({ content: `An error occured!\n\`\`\`js\n${error.stack}\`\`\``, ephemeral: true })
		} else {
			message.reply({ embeds: [this.client.error(error, ' command', message)] })
		}
	}
}
