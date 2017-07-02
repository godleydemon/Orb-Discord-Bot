require('../bot.js');


module.exports.logger = async(bot, message, orbios_id, selfid) => {
	try {
		const author = await message.author;
		const content = await message.content;
		const channel = await message.channel;
		const logchannel = await bot.channels.get("271569777686740992");
		const member = await message.guild.fetchMember(message.author);

		//Logs all messages from channels besides "staff" and "log" and "bot-stuff" and puts it all in the log channel on Orbios
		if (message.guild && message.guild.id === orbios_id) {
			if (author.id != selfid && channel != logchannel && channel.name != "staff" && channel.name != "announcements" && channel.name != "rules_and_info" && channel.name != "developers" && message.cleanContent.startsWith("@Ram") === false && channel.name != "counting") {
				if (logchannel.type === "text") {
					if (message.attachments.first() != null) {
						if (message.attachments.first()
							.message.content != null) {
							logchannel.send("[" + channel.name + "] **" + author.username + "** : Upload Comment: " + message.attachments.first()
									.message.content + " \nUpload URL: " + message.attachments.first()
									.url)
								.catch();
						} else {
							logchannel.send("[" + channel.name + "] **" + author.username + "** : Upload URL: " + message.attachments.first()
									.url)
								.catch();
						}
					} else {
						logchannel.send("[" + channel.name + "] **" + author.username + "** : " + message.cleanContent)
							.catch();
					}
				}
			}
		}
	} catch (e) {
		console.error(e);
	}

	return;
};
