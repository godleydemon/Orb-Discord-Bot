require('../bot.js');

module.exports.custom = async(message, userinput, owner_id) => {
	try {
		const author = await message.author;
		const content = await message.content;
		const channel = await message.channel;
		const member = await message.guild.fetchMember(message.author);


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
	} catch (e) {
		console.error(e);
	}

	return;
};
