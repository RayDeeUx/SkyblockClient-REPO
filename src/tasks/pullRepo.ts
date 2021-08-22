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
        if (process.platform == 'win32') {
            sh('cd SkyblockClient-REPO && git reset --hard && git pull')
        }
        else {
            sh('cd SkyblockClient-REPO && git reset --hard && git pull')
        }
    }
}