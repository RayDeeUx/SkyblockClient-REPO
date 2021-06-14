import { Command } from "discord-akairo";
import { BotCommand } from "../../../extensions/BotCommand"
import utils from '../../../functions/utils'
import { exec } from 'child_process';
import { promisify } from 'util';
import { MessageEmbed } from "discord.js";
import fs from 'fs';

const sh = promisify(exec)

export default class pullAutoresponse extends BotCommand {
    constructor() {
        super("pullAutoresponse", {
            aliases: ["pullAutoresponse"],

        });
    }
    async exec(message) {
        sh('cd SkyblockClient-REPO ; git pull')
            .then(() => {
                message.channel.send('pulled')
            })
            .catch(err => {
                utils.errorhandling(err, message)
            })
    }
}