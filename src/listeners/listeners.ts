import chalk from 'chalk';
import { exec } from 'child_process';
import { Listener } from 'discord-akairo';
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
        try{await sh('git clone https://github.com/nacrt/SkyblockClient-REPO')}
        catch(err){if (err = `fatal: destination path 'SkyblockClient-REPO' already exists and is not an empty directory.`) {console.log(chalk.red('repo found'))}}
        console.log(chalk.red('Cloned nacrt/SkyblockClient-REPO, to make sure that it\'s there!'))
        console.log(chalk.magenta(`Bot Online!`))
        console.log(`\n`)
        console.log(chalk.magentaBright(`---Bot Output---`))

        this.client.user.setActivity('Among Us burn', { type: 'WATCHING' })
    }
}

module.exports = ReadyListener;