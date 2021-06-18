import { BotCommand } from "../../../extensions/BotCommand"
import utils from '../../../functions/utils'
import { exec } from 'child_process';
import { promisify } from 'util';

const sh = promisify(exec)

export default class pullAutoresponse extends BotCommand {
    constructor() {
        super("pullAutoresponse", {
            aliases: ["pullAutoresponse"],

        });
    }
    async exec(message) {
        const coolPeople = [
            '492488074442309642', //Zordlan
            '435443705055543306', //nacrt
            '464851580370419733', //micro
            '378587857796726785', //koxx12
        ]
        if (coolPeople.includes(message.author.id)) {
            if (process.platform = 'win32') {
                sh('pull.bat')
                    .then(() => {
                        message.channel.send('pulled (probably)')
                    })
                    .catch(err => {
                        utils.errorhandling(err, message)
                    })
            }
            else {
                sh('cd SkyblockClient-REPO ; git pull')
                .then(() => {
                    message.channel.send('pulled (probably)')
                })
                .catch(err => {
                    utils.errorhandling(err, message)
                })
            }
        }
        else {
            message.channel.send('hey so you dont have the perms to run this command, if you think you deserve them ping zord or make a pr')
        }
    }
}