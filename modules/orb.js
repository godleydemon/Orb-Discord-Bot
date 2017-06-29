require('../bot.js');


module.exports.orb = async(Discord, message, userinput, orangehex, orbios_id, debugServer_id, orbioslogo, GenericErrorMessage) => {
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
					embed = new Discord.RichEmbed()
						.setColor(orangehex)
						.setTitle("Permanent Invite Link")
						.setURL("https://discord.gg/invite/0abEJoLeXf9kswil")
						.setThumbnail(orbioslogo)
						.setDescription("Invite your friends using the link above!");
				} else if (what === "roles") {
					embed = new Discord.RichEmbed()
						.setColor(orangehex)
						.setTitle("Roles List")
						.setURL("https://my.mixtape.moe/hkpuhq.txt")
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
					} else {
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
				} else if (what.startsWith('rprog ')) {
					let inviteCode = what.replace('rprog ', '');

					message.guild.fetchInvites().then(function(res, err) {
						let invite = res.get(inviteCode);

						if (invite.uses < 5) channel.send(author + ` **Progress:** ${invite.uses}/5`);
						else {
							if (member.roles.exists("name", "Recruiter")) return channel.send(author + " What are you trying to pull here?! You already have the Recruiter role.");
							if (author.id !== invite.inviter.id) return channel.send(author + " Trying to benefit off of someone else's hard work I see... /ban");

							channel.send(author + ' We need more sheep **I MEAN** people like you... hehe :blue_heart:');
							member.addRole(message.guild.roles.find("name", "Recruiter"));
						}
					}).catch(function(err) {
						if (err) console.log(err);
						channel.send(author + " Sorry, I couldn't fetch that... Try again maybe? :P");
					});
				} else if (what === "finvites") {
					let invitesMessage;
					await message.guild.fetchInvites().then(function(invite, err) {
						invite.forEach(function(invite) {
							if (author.id === invite.inviter.id && invite.maxAge === 0) {
								invitesMessage += "\n`Invite Details`\n" + "**Invite URL:** <" + invite.url + "> \n**Invite Code:** " + invite.code + "\n**Invite Uses:** " + invite.uses + "\n**Invite Expiry:** " + "Never\n";
							}
						})

						if (!invitesMessage) return channel.send(author + " You don't appear to have any permanent invites for this server...");

						invitesMessage = invitesMessage.replace('undefined', '');
						embed = new Discord.RichEmbed()
							.setColor(orangehex)
							.setThumbnail(orbioslogo)
							.setDescription(invitesMessage);

					}).catch(function(err) {
						if (err) console.log(err);
						channel.send(author + " Sorry, I couldn't fetch the invites... Maybe you didn't invite anyone? (lazy fk :cry:) jk :P");
					})
				} else {
					return;
				}

				channel.send({
						embed
					})
					.catch(function() {
						channel.send(GenericErrorMessage)
					});
			}
		}
	} catch (e) {
		console.error(e);
	}

	return;
};
