import { MessageEmbed } from 'discord.js';
import { BotCommand } from '../../extensions/BotCommand';

export default class say extends BotCommand {
    constructor() {
        super('say', {
            aliases: ['say'],
            slash:true,
            description: 'Sends a message of your choice!',
            slashGuilds: ['824680357936103497', '780181693100982273'],
            slashOptions:[
                {name:'thingtosay', description: 'What you want the bot to say!', type:'STRING'}
            ],
            ownerOnly:true
        })
    }
    async execSlash(message, slashOptions) {
        message.channel.send(slashOptions.thingtosay).then(msg => {
            const sentEmbed = new MessageEmbed()
                .setTitle('Message sent!')
                .addField('Content', msg.content)
                .setColor(message.member.roles.highest.color)
            message.interaction.reply({ embeds: [sentEmbed], ephemeral: true })
        })
    }
}