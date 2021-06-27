import axios from "axios"
import { BotCommand } from '../../extensions/BotCommand';
import utils from "../../functions/utils";

export default class json extends BotCommand {
    constructor() {
        super('json', {
            aliases: ['json'],
            args: [
                { id: 'type', type: 'string' },
                { id: 'thingToFind', match: 'restContent', type: 'string' }
            ],

            slash: true,
            slashGuilds: utils.slashGuilds,
            description: 'Sends a hastebin link to the raw json from our repo for a mod or pack.',
            slashOptions: [
                {
                    name: 'type',
                    description: 'Mod or pack?',
                    type: 'STRING',
                    choices: [
                        {
                            name: 'mod',
                            value: 'mod'
                        },
                        {
                            name: 'resource pack',
                            value: 'pack'
                        }
                    ]
                },
                {
                    name: 'thingtofind',
                    description: 'option',
                    type: 'STRING'
                }
            ]
        });
    }

    async exec(message, args) {
        if (utils.SkyClientGuilds.includes(message.guild.id)) {
            if (args.type == 'mod') {
                const modJson = await axios('https://raw.githubusercontent.com/nacrt/SkyblockClient-REPO/main/files/mods.json', { method: 'get' })

                for (let mod of modJson.data) {
                    if (mod.id == args.thingToFind) {
                        mod = JSON.stringify(mod, null, '  ')
                        message.reply(await utils.haste(mod))
                    }
                }
            }

            else if (args.type == 'pack') {
                const packJson = await axios('https://raw.githubusercontent.com/nacrt/SkyblockClient-REPO/main/files/packs.json', { method: 'get' })

                for (let pack of packJson.data) {
                    if (pack.id == args.thingToFind) {
                        pack = JSON.stringify(pack, null, '  ')
                        message.reply(await utils.haste(pack))
                    }
                }
            }
        }
    }
}