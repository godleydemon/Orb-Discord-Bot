const HerokuPort = process.env.PORT || 8080;
const express = require('express');
const app = express();

app.use(express.static(__dirname));
app.listen(HerokuPort, function() {
	console.log('Port bound successfully');
})

// Discord and node module declarations //
const Discord = require("discord.js");
const bot = new Discord.Client({
	disableEveryone: true,
	messageCacheMaxSize: 1000,
	messageCacheLifetime: 300,
	messageSweepInterval: 60
});

const config = require("./JSON/config.json");
const commands = require("./JSON/commands.json");

const Cleverbot = require('cleverbot-node');
const cb = new Cleverbot;

const jsonquery = require('json-query');

const PMessages = require('./JSON/personalized_messages.json');

const getJSON = require('get-json');

const Cryptr = require('cryptr');
const cryptr = new Cryptr('SuperSecret');

const fs = require('fs');

const asciify = require('asciify');

const isgd = require('isgd');

// Global declarations //
const self = "<@!250943511648534528>";
const prefix = ";"
const selfid = "250943511648534528";
const owner_id = "105640584470937600";
const orbios_id = "105684379648425984";
const debugServer_id = "324854543344992277";
const botpic = "E:/Stuff/Wallpapers & Themes/Pictures/orb_anime.png";
const botpiconline = "http://i.imgur.com/8VuWSCh.jpg";
const orbioslogo = "http://i68.tinypic.com/2n9wa6a.png";
const bluehex = "#00ccff";
const purplehex = "#8042f4";
const redhex = "#FF044A";
const greenhex = "#A3F37A";
const pinkhex = "#ffb6c1";
const orangehex = "#f49e42";
const GenericErrorMessage = "Something seems to have gone wrong... Sorry, try again?!";
let uploaded = false;
let voice_connection;
let d = new Date();
let Month = d.getMonth();
// --Global declarations-- //

bot.on('ready', () => {
	console.log("Bot login successfull");
	bot.user.setGame(";cmds");
	//bot.user.setUsername("Orb");
	//bot.user.setAvatar(botpic);
});

bot.on('presenceUpdate', async(oldMember, newMember) => {
	try {
		if (!newMember.user.presence.game) return;
		if (newMember.guild.id !== orbios_id && newMember.guild.id !== debugServer_id) return;
		if (newMember.roles.exists("name", "dnd")) return;

		let guild = await newMember.guild;
		let guildroles = await newMember.guild.roles;
		let newGame = await newMember.user.presence.game.name.toLowerCase();


		if (newGame === "osu!" && !newMember.roles.find("name", "osu player")) {
			newMember.addRole(guildroles.find("name", "osu player"))
		} else if (newGame === "the division" && !newMember.roles.find("name", "tctd player")) {
			newMember.addRole(guildroles.find("name", "tctd player"))
		} else if (newGame === "counter-strike: global offensive" && !newMember.roles.find("name", "csgo player")) {
			newMember.addRole(guildroles.find("name", "csgo player"))
		} else if (newGame === "diablo 3" && !newMember.roles.find("name", "diablo 3 player")) {
			newMember.addRole(guildroles.find("name", "diablo 3 player"))
		} else if (newGame === "league of legends" && !newMember.roles.find("name", "lol player")) {
			newMember.addRole(guildroles.find("name", "lol player"))
		} else if (newGame === "dragon nest" && !newMember.roles.find("name", "dn player")) {
			newMember.addRole(guildroles.find("name", "dn player"))
		} else if (newGame === "grand theft auto v" && !newMember.roles.find("name", "gtav player")) {
			newMember.addRole(guildroles.find("name", "gtav player"))
		} else if (newGame === "ark: survival evolved" && !newMember.roles.find("name", "ark player")) {
			newMember.addRole(guildroles.find("name", "ark player"))
		} else if (newGame === "garry's mod" || newGame === "gmod" || newGame === "garrysmod") {
			if (!newMember.roles.find("name", "gmod player")) {
				newMember.addRole(guildroles.find("name", "gmod player"))
			}
		} else if (newGame === "overwatch" && !newMember.roles.find("name", "overwatch player")) {
			newMember.addRole(guildroles.find("name", "overwatch player"))
		} else if (newGame === "tera" && !newMember.roles.find("name", "tera player")) {
			newMember.addRole(guildroles.find("name", "tera player"))
		} else if (newGame === "world of warcraft" || newGame === "world of warcraft ptr") {
			if (!newMember.roles.find("name", "wow player")) {
				newMember.addRole(guildroles.find("name", "wow player"))
			}
		} else if (newGame === "final fantasy xiv" && !newMember.roles.find("name", "ffxiv player")) {
			newMember.addRole(guildroles.find("name", "ffxiv player"))
		} else if (newGame === "rainbow six siege" && !newMember.roles.find("name", "tcrss player")) {
			newMember.addRole(guildroles.find("name", "tcrss player"))
		} else if (newGame === "rocket league" && !newMember.roles.find("name", "rl player")) {
			newMember.addRole(guildroles.find("name", "rl player"))
		}
	} catch (e) {
		console.log(e);
	}
});

bot.on('message', async(message) => {
	try {
		if (message.author.bot) return;

		const author = await message.author;
		const content = await message.content;
		const logchannel = await bot.channels.get("271569777686740992");
		const channel = await message.channel;
		const member = await message.guild.fetchMember(message.author);


		// Module Imports (no userinput) //
		require("./modules/social.js").social(message, orbios_id, debugServer_id, owner_id, self, prefix, fs);
		require("./modules/logger.js").logger(bot, message);
		// --Module Imports (no userinput)-- //

		//If the message starts with a mention or the prefix assume it's a command and check to see if it is...
		if (!content.startsWith(self + ' ') && !content.startsWith(prefix)) return;
		let charnum = 5;
		let cbaccess;
		let userinput;

		if (content.startsWith(self + ' ')) {
			userinput = content.replace(self, '');
			cbaccess = true;
		}
		if (content.startsWith(prefix)) {
			userinput = content.replace(prefix, '');
			cbaccess = false;
		}
		while (userinput.startsWith(' ')) {
			userinput = userinput.substring(1)
				.toLowerCase();
		}

		// Module Imports //
		require("./modules/orb.js").orb(Discord, bot, message, userinput, orangehex, orbios_id, debugServer_id, orbioslogo, GenericErrorMessage, fs);
		require("./modules/moderation.js").moderation(bot, message, userinput, selfid);
		require("./modules/osu.js").osu(Discord, message, userinput, self, pinkhex, GenericErrorMessage, getJSON);
		require("./modules/google.js").google(Discord, message, userinput, greenhex, GenericErrorMessage);
		require("./modules/youtube.js").youtube(Discord, message, userinput, redhex, GenericErrorMessage);
		require("./modules/twitch.js").twitch(Discord, message, userinput, purplehex, GenericErrorMessage);
		require("./modules/music.js").music(bot, message, userinput);
		require("./modules/anime.js").anime(Discord, message, userinput, GenericErrorMessage);
		require("./modules/wallpaper.js").wallpaper(message, userinput);
		require("./modules/custom.js").custom(message, userinput, owner_id, fs);
		require("./modules/info.js").info(message, userinput);
		require("./modules/eval.js").eval(Discord, bot, message, userinput, bluehex, owner_id, GenericErrorMessage);
		// --Module Imports-- //

		//Displays all commands that are currently available, along with what they do.
		if (userinput === 'cmds') {
			if (!message.guild) return;
			let embed;
			let cmdsList = [];

			if (message.guild.id === orbios_id || message.guild.id === debugServer_id) {
				for (let cmd in commands) {
					cmdsList += "**" + commands[cmd].name + "** | " + commands[cmd].description + "\n\n";
				}

				embed = new Discord.RichEmbed()
					.setAuthor("Remember: Use me, don't abuse me! :P", botpiconline)
					.setThumbnail(botpiconline)
					.setDescription(cmdsList)
					.setColor(bluehex);
			} else {
				for (let cmd in commands) {
					if (!commands[cmd].name.startsWith('orb')) {
						cmdsList += "**" + commands[cmd].name + "** | " + commands[cmd].description + "\n\n";
					}
				}

				embed = new Discord.RichEmbed()
					.setAuthor("Remember: Use me, don't abuse me! :P", botpiconline)
					.setThumbnail(botpiconline)
					.setDescription(cmdsList)
					.setColor(bluehex);
			}

			author.send({
					embed
				})
				.catch(function(e) {
					channel.send(GenericErrorMessage, true)
				});
			return;
		}

		//Provides a link that can be used to invite Ene to a new Discord server.
		if (userinput === 'join') {
			let embed = new Discord.RichEmbed()
				.setTitle("Invite to server")
				.setColor(bluehex)
				.setThumbnail(botpiconline)
				.setDescription("I'll join, but only if I get my own role :P")
				.setURL("https://discordapp.com/oauth2/authorize?permissions=8&scope=bot&client_id=250943511648534528");

			channel.send({
					embed
				})
				.catch(function() {
					channel.send(GenericErrorMessage, true)
				});
			return;
		}

		//Sends a link to the creator's discord server.
		if (userinput === 'creator') {
			let embed = new Discord.RichEmbed()
				.setTitle("Meet my creator")
				.setThumbnail(botpiconline)
				.setColor(bluehex)
				.setURL("https://discordapp.com/invite/0abEJoLeXf9kswil")
				.setDescription("by clicking the link (Do it, you wont!)");

			channel.send({
					embed
				})
				.catch(function() {
					channel.send(GenericErrorMessage, true)
				});
			return;
		}

		//Sends a link to the Ene Discord server.
		if (userinput === 'server') {
			let embed = new Discord.RichEmbed()
				.setTitle("Join my server")
				.setColor(bluehex)
				.setURL("https://discord.gg/2ffbTEQ")
				.setDescription("by clicking the link (Do it, you wont!)");

			channel.send({
					embed
				})
				.catch(function() {
					channel.send(GenericErrorMessage, true)
				});
			return;
		}

		//Sends a link that allows users to see their public IP address.
		if (userinput === 'myip') {
			let embed = new Discord.RichEmbed()
				.setColor(bluehex)
				.setTitle("Get your IP")
				.setURL("http://icanhazip.com/");

			channel.send({
					embed
				})
				.catch(function() {
					channel.send(GenericErrorMessage)
				});
			return;
		}

		//Rolls and returns a result between 1 and the number provided
		if (userinput.startsWith('roll')) {
			let amount = userinput.replace('roll', '');
			let text = ['Wow, you got slain by a dragon!', 'Holy moly, you found the ravioli sword!', 'Woah, you leveled up!'];
			let rnd = Math.floor(Math.random() * text.length);

			if (amount.startsWith(' ') && isNumeric(amount) === true) {
				channel.send(author + " **You rolled:** " + Math.floor(Math.random() * amount + 1) + "\n" + text[rnd]);
			} else if (amount === '') {
				channel.send(author + " **You rolled:** " + Math.floor(Math.random() * 100 + 1) + "\n" + text[rnd]);
			}
			return;
		}

		//Encrypts whatever string it is given into aes-256-ctr
		if (userinput.startsWith('encrypt ')) {
			var lastmsg = message;
			var secret = userinput.replace('encrypt ', '');
			if (!secret) return;

			channel.send(author + " " + cryptr.encrypt(secret))
				.then(function() {
					lastmsg.delete()
				});

			return;
		}

		//Converts image to ascii.
		if (userinput.startsWith('asciify ')) {
			var text = userinput.replace('asciify ', '');

			asciify(text, function(err, res) {
				if (err) return channel.send(author + " Couldn't convert to ascii.");

				fs.writeFileSync('./ascii.txt', res);
				sleep(2000)
					.then(function() {
						channel.sendFile('./ascii.txt');
					});
			});

			return;
		}

		//Shortens the url given to it.
		if (userinput.startsWith('shorten ')) {
			var url = userinput.replace('shorten ', '');

			isgd.shorten(url, function(res) {
				if (!res.toLowerCase()
					.includes('error')) {
					channel.send(author + " **Here is the shortened url:** <" + res + ">");
				} else {
					channel.send(author + " Could not shorten url...");
				}
			});

			return;
		}

		// Deletes messages according to amount stated [Default: 2]
		if (userinput.startsWith("prune")) {
			let amountString = userinput.replace("prune", "");
			let amount = parseInt(amountString) + 1;

			if (member.roles.exists("name", "Staff") && isNumeric(amountString) && amountString.startsWith(' ')) {
				message.channel.bulkDelete(amount);
			} else if (!amountString) {
				message.channel.bulkDelete(2);
			}

			return;
		}

		//This will only get run if NO other command was executed.
		//Sends the user's message to cleverbot's api and sends a message containing cleverbot's response.
		if (cbaccess === true) {
			if (message.channel.type === "dm" || message.channel.type === "text") {
				Cleverbot.prepare(function() {
					cb.write(message.cleanContent.replace("@Ene ", ""), function(response) {
						if (response.message === "<html>" || response.status === '401') {
							channel.send("The talking functionality appears to currently be out-of-order. This may take a while to fix.");
						} else {
							let embed = new Discord.RichEmbed()
								.setColor(bluehex)
								.setAuthor("Cleverbot", "http://a2.mzstatic.com/us/r30/Purple3/v4/71/6a/74/716a747d-152f-ab09-2e72-5622fd369655/icon175x175.png")
								.setTitle(author.username)
								.setDescription(response.message);

							channel.send({
									embed
								})
								.catch(function() {
									channel.send(GenericErrorMessage)
								});
						}
					})
				});
			}
		}
	} catch (e) {
		console.error(e);
	}
}); // End of bot.on('message')

//Periodically (every 60s) checks some things
setTimeout(function() {
	let jsonFile = "./JSON/invites.json";

	fs.readFile(jsonFile, function(err, data) {
		data = JSON.parse(data);

		for (const user of Object.keys(data)) {
			if (data[user].code) {
				bot.fetchInvite(data[user].code).then(function(invite, err) {
					if (invite.uses >= 5) {
						let guild = bot.guilds.get(orbios_id);
						let member = bot.guilds.get(orbios_id).fetchMember(data[user]);

						if (!member.roles.exists("name", "Recruiter")) {
							member.addRole(guild.roles.find("name", "Recruiter"));
						}
					}
				}).catch(function(err) {
					delete data[user];

					fs.writeFile(jsonFile, JSON.stringify(data), function(err) {
						if (err) return console.log(err);
					})
				});
			}
		}
	})
}, 60000)


function sleep(time) {
	return new Promise((resolve) => setTimeout(resolve, time));
}

function reverseString(string) {
	return string.split('')
		.reverse()
		.join('');
}

function isNumeric(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

//Logs into the bot account
bot.login(config.bot_debug_token).catch(e => console.error(e));

bot.on('error', (e) => {
	console.error(e);
});

process.on('uncaughtException', (e) => {
	console.error(e);
});
