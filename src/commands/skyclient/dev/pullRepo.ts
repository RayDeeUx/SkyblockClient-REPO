import { exec } from "child_process";
import { promisify } from "util";
import { BotCommand } from '../../../extensions/BotCommand';

const sh = promisify(exec)
const fs = require('fs/promises')


export default class pullRepo extends BotCommand {
    constructor() {
        super('pullRepo', {
            aliases: ['pullRepo'],
            
        })
    }

    async exec(message, args) {
        const SkyClientGuilds = [
            `780181693100982273`, //main server
            `824680357936103497` //testing server
        ]
        const peopleWithPerms = [
            '492488074442309642', //Zordlan
            '435443705055543306', //nacrt
            '378587857796726785', //Koxx12
            '464851580370419733' // micro (he deserves it)
        ]
        if (SkyClientGuilds.includes(message.guild.id) && peopleWithPerms.includes(message.author.id)) {
            await fs.readFile('SkyblockClient-REPO/files/botautoresponse.json').then(autoresponse => {
                console.log(autoresponse)
            })
        }
        else { return }
    }
}
