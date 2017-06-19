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

module.exports.moderation = async(bot, message) => {
	try {
		const author = await message.author;
		const content = await message.content;
		const channel = await message.channel;
		const logchannel = await bot.channels.get("271569777686740992");
		const member = await message.guild.fetchMember(message.author.id);

		//If the message starts with a mention or the prefix assume it's a command and check to see if it is...
		if (content.startsWith(self + ' ') || content.startsWith(prefix)) {
			var charnum = 5;
			if (content.startsWith(self + ' ')) {
				var userinput = content.replace(self + ' ', '');
				var cbaccess = true;
			}
			if (content.startsWith(prefix)) {
				var userinput = content.replace(prefix, '');
				var cbaccess = false;
			}

			while (userinput.startsWith(' ')) {
				userinput = userinput.substring(1)
					.toLowerCase();
			}

			//Mute command
			if (userinput.startsWith("mute ")) {
				if (!member.roles.exists("name", "Staff")) return;
				if (!message.mentions.users.first()) return;

				let lastmsg = message;

				if (message.mentions.users.first()
					.id === selfid) {
					var victim = await message.guild.fetchMember(message.mentions.users.last());
				} else {
					var victim = await message.guild.fetchMember(message.mentions.users.first());
				}

				lastmsg.delete();
				if (!victim) return channel.send(author + " Not a valid user...");
				victim.addRole(message.guild.roles.find("name", "Muted"))
					.catch(function() {
						channel.send(GenericErrorMessage, true);
					});
				logchannel.send(`**${author.username}** muted **${victim}**`);
				author.send(`**${victim.user.username}** was successfully muted.`);

				return;
			}

			//Unmute command
			if (userinput.startsWith("unmute ")) {
				if (!member.roles.exists("name", "Staff")) return;
				if (!message.mentions.users.first()) return;
				let lastmsg = message;

				if (message.mentions.users.first()
					.id === selfid) {
					var victim = await message.guild.fetchMember(message.mentions.users.first());
				} else {
					var victim = await message.guild.fetchMember(message.mentions.users.last());
				}

				lastmsg.delete();
				if (!victim) return channel.send(author + " Not a valid user...");
				victim.removeRole(message.guild.roles.find("name", "Muted"))
					.catch(console.error);
				logchannel.send(`**${author.username}** unmuted ${victim}`);
				author.send('**' + victim.user.username + "** was successfully unmuted.");

				return;
			}

			//Orbios warning command
			if (userinput.startsWith("warn ")) {
				if (message.guild != null && message.guild.id != orbios_id) return;
				if (!member.roles.exists("name", "Staff")) return;

				let lastmsg = message;
				let msgArray = userinput.split(" ");
				if (message.mentions.users.first()
					.id === selfid) {
					var victim = await message.guild.fetchMember(message.mentions.users.first());
				} else {
					var victim = await message.guild.fetchMember(message.mentions.users.last());
				}

				if (!victim) return channel.send(author + " Not a valid user...");
				lastmsg.delete();
				if (msgArray[2] === "abuse") {
					victim.send("This is a warning, you have been warned for abusing another member of Orbios. Please refrain from doing so in the future, as it may lead to a mute/longer mute/de-role/ban. If you think you have been wrongly accused, please contact a Moderator via DM.");
				} else if (msgArray[2] === "racism") {
					victim.send("This is a warning, you have been warned for being racist towards another member of Orbios in a malicious way. Please refrain from doing so in the future, as it may lead to a mute/longer mute/de-role/ban. If you think you have been wrongly accused, please contact a Moderator via DM.");
				} else if (msgArray[2] === "exploit") {
					victim.send("This is a warning, you have been warned for exploiting something you shouldn't have. Please refrain from doing so in the future, as it may lead to a mute/longer mute/de-role/ban. If you think you have been wrongly accused, please contact a Moderator via DM.");
				} else if (msgArray[2] === "alt") {
					victim.send("This is a warning, you have been warned for having more than one account on Orbios. Please refrain from doing so in the future, as it may lead to a mute/longer mute/de-role/ban. If you think you have been wrongly accused, please contact a Moderator via DM.");
				} else if (msgArray[2] === "nsfw") {
					victim.send("This is a warning, you have been warned for posting NSFW material outside of the appropriate channel. Please refrain from doing so in the future, as it may lead to a mute/longer mute/de-role/ban. If you think you have been wrongly accused, please contact a Moderator via DM.");
				} else if (msgArray[2] === "notnsfw") {
					victim.send("This is a warning, you have been warned for posting a disturbing/non-pornographic image/gif/video/etc in the NSFW channel. Please refrain from doing so in the future, as it may lead to a mute/longer mute/de-role/ban. If you think you have been wrongly accused, please contact a Moderator via DM.");
				} else if (msgArray[2] === "falsereport") {
					victim.send("This is a warning, you have been warned for falsely reporting someone breaking rule(s). Please refrain from doing so in the future, as it may lead to a mute/longer mute/de-role/ban. If you think you have been wrongly accused, please contact a Moderator via DM.");
				} else if (msgArray[2] === "developer") {
					victim.send("This is a warning, you have been warned for asking a Developer for help with something a Moderator can help you with. Please refrain from doing so in the future, as it may lead to a mute/longer mute/de-role/ban. If you think you have been wrongly accused, please contact a Moderator via DM.");
				} else if (msgArray[2] === "chain") {
					victim.send("This is a warning, you have been warned for contacting someone higher than a Moderator. Please refrain from doing so in the future, as it may lead to a mute/longer mute/de-role/ban. If you think you have been wrongly accused, please contact a Moderator via DM.");
				} else if (msgArray[2] === "spam") {
					victim.send("This is a warning, you have been warned for spamming in a channel on Orbios. Please refrain from doing so in the future, as it may lead to a mute/longer mute/de-role/ban. If you think you have been wrongly accused, please contact a Moderator via DM.");
				} else if (msgArray[2] === "conversation") {
					victim.send("This is a warning, you have been warned for having a conversation with a bot outside of the appropriate channel. Please refrain from doing so in the future, as it may lead to a mute/longer mute/de-role/ban. If you think you have been wrongly accused, please contact a Moderator via DM.");
				} else if (msgArray[2] === "advertising") {
					victim.send("This is a warning, you have been warned for advertising on Orbios. Please refrain from doing so in the future, as it may lead to a mute/longer mute/de-role/ban. If you think you have been wrongly accused, please contact a Moderator via DM.");
				} else if (msgArray[2] === "wronghelp") {
					victim.send("This is a warning, you have been warned for giving the wrong type of help in the #get_help channel. Please refrain from doing so in the future, as it may lead to a mute/longer mute/de-role/ban. If you think you have been wrongly accused, please contact a Moderator via DM.");
				} else if (msgArray[2] === "notidea") {
					victim.send("This is a warning, you have been warned for posting something in the #ideas channel that is not an idea. Please refrain from doing so in the future, as it may lead to a mute/longer mute/de-role/ban. If you think you have been wrongly accused, please contact a Moderator via DM.");
				} else {
					return channel.send(author + " Not a valid warning...");
				}
				author.send('**' + victim.user.username + "** has been successfully warned.");

			}
		}
	} catch (e) {
		console.error(e);
	}

	return;
};
