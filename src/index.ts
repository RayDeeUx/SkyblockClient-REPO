require('dotenv').config()
const { MongoClient } = require("mongodb");
const uri = process.env["mongodb"]


//starting the bot

import { BotClient } from "./extensions/BotClient";

//cloning repo
import { exec } from "child_process";
import { promisify } from "util";
import chalk from "chalk";

const sh = promisify(exec);

console.log('The bot is working fine, it\'s just going to take a minute to launch.')
sh('git clone https://github.com/nacrt/SkyblockClient-REPO')
    .then(() => {
        console.log(chalk`{blue nacrt/SkyblockClient-REPO} {red successfully cloned!}`)

        //start the bot if the repo isnt there
        const client = new BotClient();
        client.start();
    })
    .catch(err => {
        if (err.stderr == `fatal: destination path 'SkyblockClient-REPO' already exists and is not an empty directory.\n`) {
            console.log(chalk`{blue nacrt/SkyblockClient-REPO} {red found, so it wasn't cloned.}`)
        }
        console.log(chalk.red('Pulling repo'))
        sh('cd SkyblockClient-REPO ; git pull')

        //start the bot if the repo is there
        const client = new BotClient();
        client.start();
    })