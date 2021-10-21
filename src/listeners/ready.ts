import chalk from 'chalk'
import { exec } from 'child_process'
import { promisify } from 'util'
import { BotListener } from '../extensions/BotListener'
import fs from 'fs'
import { TextChannel } from 'discord.js'

class ReadyListener extends BotListener {
	constructor() {
		super('ready', {
			emitter: 'client',
			event: 'ready',
		})
	}

	async exec() {
		console.log(chalk`{magenta Succesfully logged in as }{magentaBright.bold ${this.client.user.tag}}`)
		console.log(await this.client.loadIPs() ? chalk`{magentaBright Succesfully loaded scamlink IPs}` : chalk`{red Failed to load scam IPs. The scamlink detector will only use SkyClient's repo.}`)
		console.log(`\n`)
		console.log(chalk.magentaBright(`---Bot Output---`))

		this.client.user.setActivity('Raine create me', { type: 'WATCHING' })

		//const statusJson = JSON.parse(fs.readFileSync("status.json", "ascii"))

		const logChannel = (await this.client.channels.fetch('880655568417751102')) as TextChannel
		if (this.client.user.id == '881446517729296414') await logChannel.send('Logged in.')

		// if (statusJson.gitRestart.status === true) {
		//     const gitRestartChannel = await this.client.channels.fetch(statusJson.gitRestart.channelID) as TextChannel

		//     if (statusJson.gitRestart.edit == true) {
		// 		const msgToEdit = await gitRestartChannel.messages.fetch(statusJson.gitRestart.editMessageID)

		// 		await msgToEdit.edit('I have been restarted.')
		// 	}

		// 	statusJson.gitRestart.channelID = ''
		// 	statusJson.gitRestart.editMessageID = ''
		//     statusJson.gitRestart.status = false
		// 	statusJson.gitRestart.edit = false
		//     fs.writeFileSync('status.json', JSON.stringify(statusJson))
		// }
	}
}

module.exports = ReadyListener
