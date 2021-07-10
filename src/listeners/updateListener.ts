import { BotListener } from '../extensions/BotListener';

class autoUpdateListener extends BotListener {
    constructor() {
        super('autoUpdateListener', {
            emitter: 'client',
            event: 'message'
        });
    }

    async exec(message) {
        if (message.channel.id == '848931262248517732') {

            const regex = /\[SkyClientBot-TEMP:master] [1-9][0-9]? new commits?/g
            if (message.embeds[0] && regex.test(message.embeds[0].title)) {
                const gitPullCommand = this.client.commandHandler.modules.find(cmd => (cmd.id == 'gitPull'))

                gitPullCommand.exec(message, '').then(() => {
                    const reloadCommand = this.client.commandHandler.modules.find(cmd => (cmd.id == 'reload'))
                    reloadCommand.exec(message, '')
                })
            }
        }
    }
}

module.exports = autoUpdateListener;