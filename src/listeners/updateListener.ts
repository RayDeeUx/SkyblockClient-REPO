import { BotListener } from '../extensions/BotListener';

class autoUpdateListener extends BotListener {
    constructor() {
        super('autoUpdateListener', {
            emitter: 'client',
            event: 'messageCreate'
        });
    }

    async exec(message) {
        if (message.channel.id == '848931262248517732') {
            const gitPullCommand = this.client.commandHandler.modules.find(cmd => (cmd.id == 'gitPull'))
            const reloadCommand = this.client.commandHandler.modules.find(cmd => (cmd.id == 'reload'))

            const regex = /\[Rain-TEMP:master\] [0-9]+ new commits?/g
            if (message.embeds[0] && regex.test(message.embeds[0].title)) {

                gitPullCommand.exec(message, '').then(() => {
                    reloadCommand.exec(message, '')
                })
            }
        }
    }
}

module.exports = autoUpdateListener;