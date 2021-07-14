import { BotTasks } from '../extensions/BotTasks'
import { exec } from 'child_process';
import { promisify } from 'util';

const sh = promisify(exec)


export default class extends BotTasks {
    constructor() {
        super("hello", {
            delay: 300000,
            runOnStart: false
        });
    }
    async exec() {
        if (process.platform == 'win32') {
            sh('pull.bat')
                .then(() => {
                    console.log('pulled nacrt/skyblockclient-repo')
                })
                .catch(err => {
                    console.log(`failed to pull nacrt/skyblockclient-repo, because ${err}`)
                })
        }
        else {
            sh('cd SkyblockClient-REPO ; git pull')
                .then(() => {
                    console.log('pulled nacrt/skyblockclient-repo')
                })
                .catch(err => {
                    console.log(`failed to pull nacrt/skyblockclient-repo, because ${err}`)
                })
        }
    }
}