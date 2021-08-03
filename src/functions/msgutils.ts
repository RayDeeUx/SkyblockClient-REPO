import { ReplyMessageOptions, Message } from "discord.js";
import commandManager from "./commandManager";



async function reply(message: Message, content: ReplyMessageOptions) {
    if (commandManager.userCanUseCommand(message)) {
        if (message.type == 'REPLY') {
            if (message.channel.type == 'GUILD_TEXT') {
                const repliedMessage = await message.channel.messages.fetch(message.reference.messageId)

                let coolReplyContent = {
                    ...content,
                    ...{ allowedMentions: { repliedUser: true } }
                }
                repliedMessage.reply(coolReplyContent)
            }
        }
        else { message.reply(content) }
    }
    if (!commandManager.userCanUseCommand(message) && message.interaction) {
        let ephemeralReplyContent = {
            ...content,
            ...{ ephemeral: true }
        }
        message.reply(ephemeralReplyContent)
    }
    if (!commandManager.userCanUseCommand(message) && !message.interaction) message.reply('<#796546551878516766> or use as a slashcommand')
}

async function prompt(message:Message, content: ReplyMessageOptions, argTime?: Number) {
    let time
    if (!argTime) {
        time = 15000
    }
    else {time = argTime}
    
    const filter = m => m.author.id == message.author.id

    message.reply(content)

    const dotThen = message.channel.createMessageCollector({ filter, time })

    let newContent

    dotThen.once('collect', async (msg: Message) => {
        newContent = msg.content
    })

    return newContent
}

export = {
    reply,
    prompt
}