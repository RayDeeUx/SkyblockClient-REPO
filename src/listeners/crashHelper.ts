import { Message } from 'discord.js'
import got from 'got/dist/source'
import { BotListener } from '../extensions/BotListener'
import utils from '../functions/utils'

export default class CrashHelper extends BotListener {
	constructor() {
		super('crashHelper', {
			emitter: 'client',
			event: 'messageCreate',
		})
	}

	async exec(message: Message) {
		const allowedGuilds = ['780181693100982273', '925260329229901834']
		if (!allowedGuilds.includes(message.guild.id)) return

		if (message.author.bot) return
		if (message.attachments.size === 0) return // await message.reply('no attachments')
		for (const [, { url }] of message.attachments) {
			if (!url.endsWith('.txt') && !url.endsWith('.log')) {
				return // await message.reply(`${url} isn't, and can't be, a crash log.`)
			}

			const log = (await got.get(url)).body
			const isLog = this.checkPossibleLog(log)

			if (isLog === false) return // await message.reply('not a log')

			let logUrl = await utils.haste(log)

			if (logUrl != 'Unable to post') {
				await message.delete()
			}

			const fixes = await JSON.parse((await got.get('https://raw.githubusercontent.com/SkyblockClient/CrashData/main/crashes.json')).body).fixes

			let extraLogOutput: string[] = []

			for (const fix of fixes) {
				let completedProblems = 0
				let maxProblems = fix.causes.length

				for (const p of fix.causes) {
					if (p.method === 'contains') {
						if (log.includes(p.value)) {
							completedProblems += 1
						}
					}
				}

				if (completedProblems === maxProblems) {
					extraLogOutput.push(fix.fix)
				}
			}

            let solutions = ''
            for (const fix of extraLogOutput) {
                solutions.length === 0 ? solutions += fix : solutions += `\n${fix}`
            }

			await message.channel.send(`**${message.author}** sent a log: ${logUrl}, and I found ${extraLogOutput.length === 1 ? `${extraLogOutput.length} fix.` : `${extraLogOutput.length} fixes.`} ${extraLogOutput.length === 0 ? '' : `\n\n${solutions}`}${message.content ? `\n\n${message.content}` : ''}`)
		}
	}

	checkPossibleLog(possibleLog: string): boolean {
		let isLog = false

		const logText = [
			'The game crashed whilst',
			'net.minecraft.launchwrapper.Launch',
			'# A fatal error has been detected by the Java Runtime Environment:',
			'---- Minecraft Crash Report ----',
			'A detailed walkthrough of the error',
			'launchermeta.mojang.com',
			'Running launcher core',
			'Native Launcher Version:',
			'[Client thread/INFO]: Setting user:',
			'[Client thread/INFO]: (Session ID is',
			'MojangTricksIntelDriversForPerformance',
			'[DefaultDispatcher-worker-1] INFO Installer',
			'[DefaultDispatcher-worker-1] ERROR Installer',
			'net.minecraftforge',
			'club.sk1er',
			'gg.essential',
			'View crash report',
		]

		for (const text of logText) {
			if (possibleLog.includes(text)) {
				isLog = true
			}
		}

		return isLog
	}
}
