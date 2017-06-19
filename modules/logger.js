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

module.exports.logger = async(bot, message) => {
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
