import { exec } from "child_process";
import { promisify } from "util";
import { BotListener } from "../extensions/BotListener";
import fs from "fs";
import commandManager from "../functions/commandManager";
import skyclientutils from "../functions/skyclientutils";

class thisIsAMinecraftModDiscordNotACSGOTradingDiscord extends BotListener {
	constructor() {
		super("thisIsAMinecraftModDiscordNotACSGOTradingDiscord", {
			emitter: "client",
			event: "messageCreate",
		});
	}

	async exec(message) {
		if (!message.member) return;
		if (message.member.roles.cache.has("780182606628782100")) return;
		if (message.member.permissions.toArray().includes("ADMINISTRATOR")) return;

		if (message.author.id != this.client.user.id) {
			let ohMyFuckingGodThisIsADiscordForMinecraftNotForCSGOTradingOrScammingOfAnyKind = await skyclientutils.getRepo("scamlinks.json", true);

			ohMyFuckingGodThisIsADiscordForMinecraftNotForCSGOTradingOrScammingOfAnyKind.forEach(async (fakeSteamLink) => {
				if (message.content.includes(fakeSteamLink)) {
					if (message.member) {
						if (message.guild.id == '780181693100982273') {
							let hasRole = false;
							message.member.roles.cache.forEach((role) => {
								if (commandManager.bypassRoles.includes(role.id) || message.author.id == message.guild.ownerID) {
									return (hasRole = true);
								}
							});
							if (hasRole) {
								message.delete();
								message.guild.channels.cache.get("796895966414110751").send(`${message.author.tag} sent a scam link.\nMessage content: \`\`\`\n${message.content}\`\`\``);
								return message.channel.send(`hey yeah you shouldn't send those ${message.author}`);
							}

							if (message.member.bannable && !hasRole) {
								try {
									await message.author.send("Hey, did you know that we ban for scamming?");
								} catch (err) {}
								message.member.ban({ reason: "Sending a scam link" });
								message.delete();
								message.guild.channels.cache.get("796895966414110751").send(`${message.author.tag} has been banned for sending a scam link`);
							}
						}
                        else if (message.guild.id == '762808525679755274') {
                            if (message.member.permissions.toArray().includes("ADMINISTRATOR")) {
								message.delete();
								message.guild.channels.cache.get("879037311235526666").send(`${message.author.tag} sent a scam link.\nMessage content: \`\`\`\n${message.content}\`\`\``);
								return message.channel.send(`hey yeah you shouldn't send those ${message.author}`);
							}

							if (message.member.bannable && !message.member.permissions.toArray().includes("ADMINISTRATOR")) {
								try {
									await message.author.send("Hey, did you know that we ban for scam/malicious links?");
								} catch (err) {}
								message.member.ban({ reason: "Sending a scam link" });
								message.delete();
								message.guild.channels.cache.get("879037311235526666").send(`${message.author.tag} has been banned for sending a scam link`);
							}
                        }
					}
				}
			});
		}
	}
}

module.exports = thisIsAMinecraftModDiscordNotACSGOTradingDiscord;
