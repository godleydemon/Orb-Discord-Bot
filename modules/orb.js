require('../bot.js');


module.exports.orb = async(Discord, bot, message, userinput, orangehex, orbios_id, debugServer_id, orbioslogo, GenericErrorMessage, fs) => {
	try {
		const author = await message.author;
		const content = await message.content;
		const channel = await message.channel;
		const member = await message.guild.fetchMember(message.author);

		//A bunch of commands for Orbios
		if (userinput.startsWith('orb ')) {
			if (message.guild != null) {
				if (message.guild.id !== orbios_id && message.guild.id !== debugServer_id) return;
				let what = userinput.replace('orb ', '');
				let embed;

				if (what === "site") {
					embed = new Discord.RichEmbed()
						.setColor(orangehex)
						.setTitle("Orbios Website")
						.setURL("http://orbios.netau.net/")
						.setThumbnail(orbioslogo)
						.setDescription("The home to all sorts of useful and fancy things!");
				} else if (what === "invite") {
					let jsonFile = "./JSON/invites.json";

					fs.readFile(jsonFile, function(err, data) {
						data = JSON.parse(data);

						if (data[author.id]) {

							bot.fetchInvite(data[author.id].code).then(function(invite) {
								embed = new Discord.RichEmbed()
									.setColor(orangehex)
									.setTitle("Your Invite Link")
									.setThumbnail(orbioslogo)
									.setURL(invite.url)
									.setDescription("Invite 5 people within 24 hours and you will get the **Recruiter** role!");
							}).catch(function(err) {
								message.guild.channels.get('105684379648425984').createInvite({
									reason: "User requested invite for Orbios."
								}).then(function(invite, err) {

									data[author.id].url = invite.url;
									data[author.id].code = invite.code;
									embed = new Discord.RichEmbed()
										.setColor(orangehex)
										.setTitle("Your Invite Link")
										.setThumbnail(orbioslogo)
										.setURL(invite.url)
										.setDescription("Invite 5 people within 24 hours and you will get the **Recruiter** role!");

									fs.writeFile(jsonFile, JSON.stringify(data), function(err) {
										if (err) return console.log(err);
									})
								});
							})
						} else {
							message.guild.channels.get('105684379648425984').createInvite({
								reason: "User requested invite for Orbios."
							}).then(function(invite, err) {

								data[author.id] = {
									url: invite.url,
									code: invite.code
								};
								embed = new Discord.RichEmbed()
									.setColor(orangehex)
									.setTitle("Your Invite Link")
									.setThumbnail(orbioslogo)
									.setURL(invite.url)
									.setDescription("Invite 5 people within 24 hours and you will get the **Recruiter** role!");

								fs.writeFile(jsonFile, JSON.stringify(data), function(err) {
									if (err) return console.log(err);
								})
							});
						}
					})
				} else if (what === "roles") {
					embed = new Discord.RichEmbed()
						.setColor(orangehex)
						.setTitle("Roles List")
						.setURL("https://my.mixtape.moe/ydvqfe.txt")
						.setThumbnail(orbioslogo)
						.setDescription("See all the available roles by clicking the link above!");
				} else if (what.startsWith("sr ")) {
					let role = what.replace("sr ", "");

					if (!message.guild.roles.find("name", role)) {
						embed = new Discord.RichEmbed()
							.setColor(orangehex)
							.setThumbnail(orbioslogo)
							.setTitle("Error")
							.setDescription(`Assigning the role failed... Maybe you spelt it wrong?`);
					} else if (role.endsWith("player") === true || role === 'dnd' || role === 'SFW') {
						member.addRoles(message.guild.roles.find("name", role));
						embed = new Discord.RichEmbed()
							.setColor(orangehex)
							.setThumbnail(orbioslogo)
							.setTitle("Role has been assigned!")
							.setDescription(`I hope you enjoy having the **${role}** role`);
					}
				} else if (what === "tournament") {
					embed = new Discord.RichEmbed()
						.setColor(orangehex)
						.setThumbnail(orbioslogo)
						.setTitle("Tournament Server")
						.setURL("https://discord.gg/ZQdXRNJ")
						.setDescription("I hope you enjoy the tournaments!");
				} else if (what === "puzzle") {
					embed = new Discord.RichEmbed()
						.setColor(orangehex)
						.setThumbnail(orbioslogo)
						.setTitle("Puzzle Link")
						.setURL("http://orbios.netau.net/Orbiospuzzle/")
						.setDescription("I wish you the best of luck with the puzzle!");
				} else {
					return;
				}

				let _flagCheck = setInterval(function() {
					if (embed) {
						clearInterval(_flagCheck);
						channel.send({
								embed
							})
							.catch(function() {
								channel.send(GenericErrorMessage)
							});
					}
				}, 100);
			}
		}
	} catch (e) {
		console.error(e);
	}

	return;
};
