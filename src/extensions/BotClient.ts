import chalk from "chalk";
import { AkairoClient, CommandHandler, InhibitorHandler, ListenerHandler, TaskHandler } from "discord-akairo";
import { Intents, Message, MessageEmbed, TextChannel } from "discord.js";
import { join } from "path";
import utils from '../functions/utils';
import config from './config/config'

export class BotClient extends AkairoClient {
	public commandHandler: CommandHandler = new CommandHandler(this, {
		autoRegisterSlashCommands: true,
		prefix: ["-"],
		commandUtil: true,
		handleEdits: true,
		directory: join(__dirname, "..", "commands"),
		allowMention: true,
		autoDefer: false,
		automateCategories: true,
	})
	public listenerHandler: ListenerHandler = new ListenerHandler(this, {
		directory: join(__dirname, "..", "listeners"),
		automateCategories: true
	})

	public inhibitorHandler: InhibitorHandler = new InhibitorHandler(this, {
		directory: join(__dirname, "..", "inhibitors")
	})

	public taskHandler: TaskHandler = new TaskHandler(this, {
		directory: join(__dirname, "..", "tasks")
	})
	public constructor() {
		super(
			{
				ownerID: ['492488074442309642'],
				intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
			},
			{
				allowedMentions: {
					parse: ['users']
				},
				intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
			}
		)
	}

	public config = config
	
	public error = (error: Error, type?: string, message?: Message) => {
		const errorChannel = this.channels.cache.get(config.find(thing => thing.id === 'errorChannelID').value) as TextChannel

		const errorCode = utils.getRandomInt(69696969696969)

		let errorStack = error.stack

		if (errorStack.length > 1000) {
			errorStack = errorStack.substring(0, 1000)
		}

		const errorEmbed = new MessageEmbed()
		if (!type) { errorEmbed.setTitle('An error occured!') }
		else { errorEmbed.setTitle(`A${type} error occured!`) }
		errorEmbed.addField('Error code', `\`${errorCode}\``)
		errorEmbed.setDescription(`\`\`\`js\n${errorStack}\`\`\``)
		errorEmbed.setColor('DARK_RED')

		if (message) {
			errorEmbed.addField('More Info', `Guild: ${message.guild.name} (\`${message.guild.id}\`)
			Channel: ${(message.channel as TextChannel).name} (\`${message.channel.id}\`)
			Message ID: \`${message.id}\`
			
			Author: ${message.author.tag} (\`${message.author.id}\`)
			
			[Message Link](https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id})
			Message Content: ${message.content}
			`)
		}

		errorChannel.send({ /*content: `\`\`\`js\n${errorStack}\`\`\``,*/ embeds: [errorEmbed] })

		const returnErrorEmbed = new MessageEmbed()
			.setTitle('An error occured!')
			.setDescription(`Please give my developer code \`${errorCode}\``)
			.setColor('DARK_RED')

		return returnErrorEmbed
	}

	private async _init(): Promise<void> {
		this.commandHandler.useListenerHandler(this.listenerHandler)
		this.commandHandler.useInhibitorHandler(this.inhibitorHandler)
		this.listenerHandler.setEmitters({
			commandHandler: this.commandHandler,
			listenerHandler: this.listenerHandler,
			process
		});
		// loads all the stuff
		const loaders = {
			commands: this.commandHandler,
			listeners: this.listenerHandler,
			inhibitors: this.inhibitorHandler,
			tasks: this.taskHandler,
		};
		for (const loader of Object.keys(loaders)) {
			try {
				loaders[loader].loadAll()
				if (loader == 'tasks') { loaders[loader].startAll() }
				console.log(chalk.blueBright(`Succesfully loaded ${loader}.`))
			} catch (e) {
				console.error(`Unable to load ${loader} with error ${e}.`)
			}
		}
	}

	public async start(): Promise<string> {
		let token
		config.forEach(thing => {
			if (thing.id == 'token') {
				token = thing.value
			}
		})
		
		await this._init()
		return this.login(token)
	}
}