import { BotTasks } from '../extensions/BotTasks'
import { exec } from 'child_process';
import { promisify } from 'util';

const sh = promisify(exec)


export default class extends BotTasks {
    constructor() {
        super("pullRepo", {
            delay: 60000,
            runOnStart: true
        });
    }
    async exec() {
        // if (process.platform == 'win32') {
        //     sh('pull.bat')
        //         .then(() => {
        //             //console.log('pulled nacrt/skyblockclient-repo')
        //         })
        //         .catch(err => {
        //             console.log(`failed to pull nacrt/skyblockclient-repo, because ${err}`)
        //         })
        // }
        //else {
            sh('cd SkyblockClient-REPO && git pull --force')
                .then(() => {
                    //console.log('pulled nacrt/skyblockclient-repo')
                })
                .catch(err => {
                    console.log(`failed to pull nacrt/skyblockclient-repo, because ${err}`)
                })
        //}
    }
}