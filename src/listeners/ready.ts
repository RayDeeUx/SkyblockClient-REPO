import chalk from 'chalk';
import { exec } from 'child_process';
import { promisify } from 'util';
import { BotListener } from '../extensions/BotListener';

const sh = promisify(exec)

class ReadyListener extends BotListener {
    constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready'
        });
    }

    async exec() {
        console.log(chalk`{magenta Succesfully logged in as }{magentaBright.bold ${this.client.user.tag}}`)
        console.log(`\n`)
        console.log(chalk.magentaBright(`---Bot Output---`))

        this.client.user.setActivity('Lisena create me', { type: 'WATCHING' })
    }
}

module.exports = ReadyListener;