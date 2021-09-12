import { ReplyMessageOptions, Message } from 'discord.js'
import commandManager from './commandManager'

async function reply(message: Message, content: ReplyMessageOptions, forceEphemeral?: boolean) {
	if (forceEphemeral && message.interaction && commandManager.userCanUseCommand(message)) {
		let ephemeralReplyContent = {
			...content,
			ephemeral: true,
		}
		return await message.reply(ephemeralReplyContent)
	}

	if (commandManager.userCanUseCommand(message)) {
		if (message.type == 'REPLY') {
			if (message.channel.type == 'GUILD_TEXT') {
				const repliedMessage = await message.channel.messages.fetch(message.reference.messageId)

				let coolReplyContent = {
					...content,
					allowedMentions: { repliedUser: true },
				}
				return await repliedMessage.reply(coolReplyContent)
			}
		} else {
			return await message.reply(content)
		}
	}
	if (!commandManager.userCanUseCommand(message) && message.interaction) {
		let ephemeralReplyContent = {
			...content,
			ephemeral: true,
		}
		return await message.reply(ephemeralReplyContent)
	}

	if (!commandManager.userCanUseCommand(message) && !message.interaction) return await message.reply('<#796546551878516766> or use as a slashcommand')
}

export = {
	reply,
}
