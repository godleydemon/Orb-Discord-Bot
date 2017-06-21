require('../bot.js');

// Global declarations //
const self = "<@!250943511648534528>";
const prefix = ";"
const selfid = "250943511648534528";
const owner_id = "105640584470937600";
const orbios_id = "105684379648425984";
const debugServer_id = "324854543344992277";
var botpic = "E:/Stuff/Wallpapers & Themes/Pictures/ene_pic.jpg";
const botpiconline = "http://i.imgur.com/8VuWSCh.jpg";
const orbioslogo = "http://i.imgur.com/LwPxT50.jpg";
const bluehex = "#00ccff";
const purplehex = "#8042f4";
const redhex = "#FF044A";
const greenhex = "#A3F37A";
const GenericErrorMessage = "Something seems to have gone wrong... sorry, try again!";
// --Global declarations-- //

module.exports.social = async(message) => {
	try {
		const author = await message.author;
		const content = await message.content;
		const channel = await message.channel;
		const member = await message.guild.fetchMember(message.author);

		// Social responses/interactions for Orbios //
		if (message.guild != null) {
			if (message.guild.id === orbios_id || message.guild.id === debugServer_id) {
				//Respond to owner confessing love
				if (author.id === owner_id || member.roles.exists('name', 'Developer')) {
					if (content === "❤" || content === "<3") {
						channel.send(":blue_heart:");

						return "complete";
					} else if (content.toLowerCase()
						.includes("ily") && content.toLowerCase()
						.includes("ene")) {
						channel.send(":blue_heart:");

						return "complete";
					} else if (content.toLowerCase()
						.includes("ily") && content.includes(self)) {
						channel.send(":blue_heart:");

						return "complete";
					}
				}

				//Good night response
				if (content.toLowerCase()
					.startsWith("gn") || content.toLowerCase()
					.startsWith("good night") || content.toLowerCase()
					.startsWith("goodnight")) {
					if (content.toLowerCase()
						.includes("ene")) {
						let user = JQ('users[id=' + author.id + '].GNMessage', {
							data: PG
						});

						if (user.value != null) {
							channel.send(author + " " + user.value);
						} else {
							channel.send(author + " Good night! Hope to see you tomorrow!");
						}
						return "complete";
					}
				}

				//Good morning response
				if (content.toLowerCase()
					.startsWith("good morning") || content.toLowerCase()
					.startsWith("goodmorning") || content.toLowerCase()
					.startsWith("gm")) {
					if (content.toLowerCase()
						.includes("ene")) {
						let user = JQ('users[id=' + author.id + '].GMMessage', {
							data: PG
						});

						if (user.value != null) {
							channel.send(author + " " + user.value);
						} else {
							channel.send(author + " Good morning! Glad to see you back! :blue_heart:");
						}
						return "complete";
					}
				}

				//Replies if someone is asking how to see/use Ene's commands
				if (content.toLowerCase()
					.includes("ene") && content.toLowerCase()
					.includes(" commands")) {

					let msgArray = content.split('ene');

					if (reverseString(msgArray[0]) === '' || reverseString(msgArray[0])
						.startsWith(' ')) {
						if (msgArray[1].toLowerCase()
							.startsWith('s commands') || msgArray[1].toLowerCase()
							.startsWith("'s commands") || msgArray[1].toLowerCase()
							.startsWith(' commands')) {

							channel.send("If you want to see my commands and how to use them please type `Ene#5325 cmds` or `" + prefix + "cmds`");
						}
					}
				}

				//Replies if someone is saying Rem is better
				if (content.toLowerCase()
					.includes("rem is better") || content.toLowerCase()
					.includes("rem is >")) {
					channel.send("Who's Rem?\nhttps://66.media.tumblr.com/ff979a01f10acbe5370e1b19589cdda4/tumblr_oc9jcdowFq1vbj92eo1_500.jpg");
					return "complete";
				}

				//If someone posts an osu screenshot, assume it's a ss of a score they got, and congratulate them.
				if (message.channel.id === "148690700953714688" && message.content.toLowerCase()
					.includes("osu.ppy.sh/ss/")) {
					channel.send("Nice one " + message.author.username + "!");
					return "complete";
				}

				//If someone says the words "Orbios is shit" (or similar) in order, assume they are trashing Orbios. And trash them back.
				if (content.toLowerCase()
					.includes("orbios is shit") || content.toLowerCase()
					.includes("orbios is crap") || content.toLowerCase()
					.includes("orbios is garbage") || content.toLowerCase()
					.includes("orbios is trash") || content.toLowerCase()
					.includes("orbios is cancer") || content.toLowerCase()
					.includes("Orbios is terrible")) {
					channel.send(author + " " + "It's still nowhere near as bad as you :wink:");
					return "complete";
				} else if (content.toLowerCase()
					.includes("orbios is useless") || content.toLowerCase()
					.includes("orbios is worthless") || content.toLowerCase()
					.includes("orbios is adopted") || content.toLowerCase()
					.includes("orbios is filth")) {
					channel.send(author + " " + "It's still nowhere near as bad as you :wink:");
					return "complete";
				}

				//If someone forgets to put 'orbios' in front of the Orbios commands, it will tell them.
				if (content.startsWith(self) || content.startsWith(prefix)) {

					if (content.startsWith('sr ') || content === 'tournament' || content === 'site' || content === 'invite' || content === 'roles' || content.startsWith('custom ') || content === 'puzzle') {
						channel.send(author + " You appear to have forgotten to put **orb** in front of the command! ");
						return "complete";
					}
				}

				//If someone says osu! wrong it will correct them.
				if (content.toLowerCase()
					.includes("osu") && content.includes("osu") === false) {
					channel.send(author + " ***osu!*** *");
				}

				//If someone says rem is ____ (good remark) it will reply aggressively.
				if (content.toLowerCase()
					.includes('rem is best') || content.toLowerCase()
					.includes('rem is waifu') || content.toLowerCase()
					.includes('rem is the best') || content.toLowerCase()
					.includes("rem's the best")) {
					if (content.toLowerCase()
						.includes('not') === false && content.toLowerCase()
						.includes('jk') === false && content.toLowerCase()
						.includes('kidding') === false && content.toLowerCase()
						.includes('kappa') === false) {
						if (author.id === owner_id) {
							channel.send(":anger: Now we both know that isn't true, master...");
						} else {
							channel.send(":anger:");
						}
					}
				}

				//If someone says ene is ____ (good remark) then it will show some appreciation.
				if (content.toLowerCase()
					.includes('ene is best') || content.toLowerCase()
					.includes('ene is waifu') || content.toLowerCase()
					.includes('ene is the best') || content.toLowerCase()
					.includes("ene's the best") || content.toLowerCase()
					.includes("ene is better")) {
					if (content.toLowerCase()
						.includes('not') === false && content.toLowerCase()
						.includes('jk') === false && content.toLowerCase()
						.includes('kidding') === false && content.toLowerCase()
						.includes('kappa') === false) {
						if (author.id === owner_id) {
							channel.send("Thank you, master... :blue_heart:");
						} else {
							channel.send(":blue_heart:");
						}
					}
				}

				//If an announcement is made which has :thumbsup: and :thumbsdown: assume it's a vote of some sort and add the reactions.
				if (author.id === owner_id && content.includes('👍') && content.includes('👎')) {
					message.react("👍");
					message.react("👎");
				}

				//If someone doesn't put a role after sr, reply to them.
				if (content === 'sr') {
					channel.send(author + ' Alright, let me assign the role of nothing to you...')
						.then(function() {
							sleep(3000)
								.then(() => {
									channel.send(author + ' Done... Role **literally nothing** was applied... Baka.');
								})
						});
				}
			}
		}
	} catch (e) {
		console.error(e);
	}

	return;
};

function reverseString(string) {
	return string.split('')
		.reverse()
		.join('');
}

function sleep(time) {
	return new Promise((resolve) => setTimeout(resolve, time));
}
