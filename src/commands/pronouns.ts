import { User } from "discord.js";
import { MessageEmbed } from "discord.js";
import language from "../constants/language";
import { BotCommand } from '../extensions/BotCommand';
import utils from "../functions/utils";

export default class pronouns extends BotCommand {
    constructor() {
        super('pronouns', {
            aliases: ['pronouns'],
            slash:true,
            description: 'Displays the pronouns of a user',
            slashGuilds: ['824680357936103497', '780181693100982273', '794610828317032458'],
            slashOptions:[
                {
                    name:'person', 
                    description: 'Whoever you want to know the pronouns of', 
                    type:'USER', 
                    required: false
                }
            ],
            args: [{ id: `person`, type: `user`, default: message => message.author }]
        })
    }
    async exec(message, args) {
        const pronouns = await utils.getPronouns(args.person, `details`)

        const pronounsEmbed = await (await language.pronounsSet(args.person, message.author, pronouns))
            .setColor(message.member.roles.highest.color)
            
        message.channel.send({embeds:[pronounsEmbed]})
    }
    async execSlash(message, slashOptions) {

        let user
        if(slashOptions.person) {user = slashOptions.person.user}
        else if (!slashOptions.person) {user = message.author}
        const pronouns = await utils.getPronouns(user, `details`)

        const pronounsEmbed = new MessageEmbed()

        if (user.id == message.author.id) { pronounsEmbed.setTitle(`Your pronouns`) }
        else { pronounsEmbed.setTitle(`${user.username}'s pronouns`) }
        
         pronounsEmbed.setDescription(pronouns)
        pronounsEmbed.setFooter(`Data from https://pronoundb.org`)

        message.reply({embeds:[pronounsEmbed]})
    }
}