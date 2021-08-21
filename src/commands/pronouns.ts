import { MessageEmbed } from "discord.js"
import { BotCommand } from '../extensions/BotCommand'
import utils from "../functions/utils"

export default class pronouns extends BotCommand {
    constructor() {
        super('pronouns', {
            aliases: ['pronouns'],
            args: [{ id: 'person', type: 'user', match: 'rest' }],

            description: 'Shows the pronouns of a user, if they have them set on https://pronoundb.org',
    
            slashOptions:[{name:'person',type:'STRING',description:'the person you want to know the pronouns of'}],
            slash: true,
            slashGuilds: utils.slashGuilds
        })
    }
    async exec(message, args) {
        console.log(args.person)
        const person = await utils.fetchUser(args.person || message.author.id || message.user.id)

        const pronouns = await utils.getPronouns(person, 'details')
        const pronounsEmbed = new MessageEmbed()

        if (args.person.id == message.author.id) { pronounsEmbed.setTitle('Your pronouns') }
        else { pronounsEmbed.setTitle(`${person.username}'s pronouns`) }

        pronounsEmbed.setDescription(pronouns)
        pronounsEmbed.setFooter('Data from https://pronoundb.org')

        message.reply({ embeds: [pronounsEmbed] })
    }
}
