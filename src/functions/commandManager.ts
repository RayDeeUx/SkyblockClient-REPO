import { Message, Snowflake } from "discord.js"


const bypassRoles = [
    '780182606628782100',
    '780183853628260352',
    '832754819588292679',
    '797158676309344268',
    '829336516315971626',
    '783441401492799518',
    '798163409467998249',
    '844275169010647050',
    '799020944487612428',
    '780202942321655858',
] as unknown as Snowflake

function userCanUseCommand(message: Message) {

    if (message.guild.id != '780181693100982273') { return true }
    
    let userHasBypassRole = false

    const allowedChannels = [
        '796546551878516766', //bot commands
    ]
    let channelIsAllowed = false

    const guildID = '780181693100982273'

    message.member.roles.cache.forEach(role => {
        if (bypassRoles.includes(role.id)) {
            return userHasBypassRole = true
        }
    })
    allowedChannels.forEach(channel => {
        if (message.channel.id == channel) {
            return channelIsAllowed = true
        }
    })
    //@ts-ignore
    if (userHasBypassRole == true) {
        return true
    }
    //@ts-ignore
    if (channelIsAllowed == true) {
        return true
    }
    return false
}

export = {
    userCanUseCommand,
    bypassRoles
}