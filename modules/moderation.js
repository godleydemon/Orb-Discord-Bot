require('../bot.js');


module.exports.moderation = async(bot, message, userinput, selfid, orbios_id, debugServer_id) => {
	try {
		const author = await message.author;
		const content = await message.content;
		const channel = await message.channel;
		const logchannel = await bot.channels.get("271569777686740992");
		const member = await message.guild.fetchMember(message.author.id);


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
			if (message.guild.id === orbios_id || message.guild.id === debugServer_id) {
				if (member.roles.exists("name", "Staff")) {

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
					} else if (msgArray[2] === "notidea") {
						victim.send("This is a warning, you have been warned for posting something in the #ideas channel that is not an idea. Please refrain from doing so in the future, as it may lead to a mute/longer mute/de-role/ban. If you think you have been wrongly accused, please contact a Moderator via DM.");
					} else {
						return channel.send(author + " Not a valid warning...");
					}
					author.send('**' + victim.user.username + "** has been successfully warned.");

				}
			}
		}
	} catch (e) {
		console.error(e);
	}

	return;
};
