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


module.exports.custom = async(message) => {
	try {
		const author = await message.author;
		const content = await message.content;
		const channel = await message.channel;
		const member = await message.guild.fetchMember(message.author);

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

			//Allows users with specific roles on Orbios to request custom replies for Ram
			if (userinput.startsWith("orb custom ")) {
				let Mroles = member.roles;
				let Groles = message.guild.roles;
				if (!Groles) return;
				if (!Mroles) return;

				if (!Mroles.find('name', 'Staff')) {
					if (!Mroles.find('name', 'Trusted')) {
						if (!Mroles.find('name', 'Recruiter')) {
							if (!Mroles.find('name', 'osu! champion')) {
								if (!Mroles.find('name', 'Twitch Streamer')) {
									channel.send(author + " Only people with `Staff, Trusted, osu! champion, Recruiter or Twitch Streamer` role can do that.");
									return;
								}
							}
						}
					}
				}

				if (userinput.startsWith("orb custom gn ")) {
					let finalmsg = userinput.replace('orb custom gn ', '');

					message.guild.members.get(owner_id)
						.send(author.username + " Has requested their GN message to be set to `" + finalmsg + "`");
					channel.send(author + " Your request to get a custom GN message has been sent to Zeval. It may take up to 24 hours to be implemented (if accepted). But usually, if he is online, it will only take 1-5 hours at most.");
					return;
				}

				if (userinput.startsWith("orb custom gm ")) {
					let finalmsg = userinput.replace('orb custom gm ', '');

					message.guild.members.get(owner_id)
						.send(author.username + " Has requested their GM message to be set to `" + finalmsg + "`");
					channel.send(author + " Your request to get a custom GM message has been sent to Zeval. It may take up to 24 hours to be implemented (if accepted). But usually, if he is online, it will only take 1-5 hours at most.");
					return;
				}

			}
		}
	} catch (e) {
		console.error(e);
	}

	return;
};
