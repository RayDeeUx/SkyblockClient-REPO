import { BotListener } from '../extensions/BotListener'
import { MessageActionRow, MessageButton } from 'discord.js'

export default class QalcyoAutoresponse extends BotListener {
	constructor() {
		super('QalcyoAutoresponse', {
			emitter: 'client',
			event: 'messageCreate',
		})
	}

	async exec(message) {
		if (!message.guild) return
		if (message.guild.id != '884212442664697937' || message.guild.id != '914828318409388102') return
		if (message.channel.parent.id != '901802497398693918' || message.channel.parent.id != '914830235382480936') return
		if (message.channel.type != 'GUILD_TEXT' && message.channel.type != 'GUILD_PUBLIC_THREAD') {
			return
		}
		if (message.content.startsWith('-') || message.content.startsWith('b!') || message.content.startsWith('t!') || message.content.startsWith('$') || message.content.startsWith('```')) return
		if (message.author.bot != false) {
			return
		}

		let noAutorespond = false

		if (message.member.roles.cache.has('852016624605462589')) {
			return (noAutorespond = true)
		}

		let response: any
		this.client.QalcyoAutoresponse.forEach(async (trigger) => {
			const triggers = trigger.triggers
			const content = message.content.toLowerCase()

			let contains = this.recursiveSearch(content, triggers, 0)
			if (contains && noAutorespond == false) {
				response = trigger.response

				const row = new MessageActionRow().addComponents(new MessageButton().setLabel('Delete').setStyle('DANGER').setCustomId(`arDelMsg|${message.author.id}`))

				await message.reply({ content: response, components: [row] })
			}
		})
	}

	recursiveSearch(cutContent: string, triggers: Array<Array<string>>, index: number): boolean {
		const wordList = triggers[index]
		let indexOf = -1

		for (const word of wordList) {
			indexOf = cutContent.indexOf(word)
			if (indexOf != -1) {
				indexOf += word.length
				if (triggers.length == index + 1) {
					return true
				}
				break
			}
		}
		if (indexOf != -1) {
			return this.recursiveSearch(cutContent.substr(indexOf), triggers, index + 1)
		}
		return false
	}
}
