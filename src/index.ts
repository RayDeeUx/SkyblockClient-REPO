require('dotenv').config()

//starting the bot

import { BotClient } from "./extensions/BotClient";

//cloning repo
import { exec } from "child_process";
import { promisify } from "util";
import chalk from "chalk";

const client = new BotClient();

const sh = promisify(exec);

sh('git clone https://github.com/nacrt/SkyblockClient-REPO')
    .then(() => {
        console.log(chalk`{blue nacrt/SkyblockClient-REPO} {red successfully cloned!}`)

        //start the bot if the repo isnt there
        client.start();
    })
    .catch(err => {
        if (err.stderr == `fatal: destination path 'SkyblockClient-REPO' already exists and is not an empty directory.\n`) {
            console.log(chalk`{blue nacrt/SkyblockClient-REPO} {red found, so it wasn't cloned.}`)
        }
        console.log(chalk.red('Pulling repo'))
        if (process.platform == 'win32') { sh('pull.bat') }
        else { sh('cd SkyblockClient-REPO ; git pull') }

        //start the bot if the repo is there
        client.start();
    })

export default client