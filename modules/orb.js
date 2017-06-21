require('../bot.js');


module.exports.orb = async(Discord, message, userinput, redhex) => {
	try {
		const author = await message.author;
		const content = await message.content;
		const channel = await message.channel;
		const member = await message.guild.fetchMember(message.author);

		//A bunch of commands for Orbios
		if (userinput.startsWith('orb ')) {
			if (message.guild != null) {
				if (message.guild.id === orbios_id || message.guild.id === debugServer_id) {
					let what = userinput.replace('orb ', '');

					if (what === "site") {
						var embed = new Discord.RichEmbed()
							.setColor(redhex)
							.setTitle("Orbios Website")
							.setURL("http://orbios.netau.net/")
							.setThumbnail(orbioslogo)
							.setDescription("The home to all sorts of useful and fancy things!");
					} else if (what === "invite") {
						var embed = new Discord.RichEmbed()
							.setColor(redhex)
							.setTitle("Permanent Invite Link")
							.setURL("https://discord.gg/invite/0abEJoLeXf9kswil")
							.setThumbnail(orbioslogo)
							.setDescription("Invite your friends using the link above!");
					} else if (what === "roles") {
						var embed = new Discord.RichEmbed()
							.setColor(redhex)
							.setTitle("Roles List")
							.setURL("https://my.mixtape.moe/hkpuhq.txt")
							.setThumbnail(orbioslogo)
							.setDescription("See all the available roles by clicking the link above!");
					} else if (what.startsWith("sr")) {
						var role = userinput.replace("orb sr ", "");

						if (!message.guild.roles.find("name", role) || guild.roles.exists("name", role) === false) {
							var embed = new Discord.RichEmbed()
								.setColor(redhex)
								.setThumbnail(orbioslogo)
								.setTitle("Error")
								.setDescription(`Assigning the role failed... Maybe you spelt it wrong?`);
						} else {
							member.addRoles(message.guild.roles.find("name", role));
							var embed = new Discord.RichEmbed()
								.setColor(redhex)
								.setThumbnail(orbioslogo)
								.setTitle("Role has been assigned!")
								.setDescription(`I hope you enjoy having the **${role}** role`);
						}
					} else if (what === "tournament") {
						var embed = new Discord.RichEmbed()
							.setColor(redhex)
							.setThumbnail(orbioslogo)
							.setTitle("Tournament Server")
							.setURL("https://discord.gg/ZQdXRNJ")
							.setDescription("I hope you enjoy the tournaments!");
					} else if (what === "puzzle") {
						var embed = new Discord.RichEmbed()
							.setColor(redhex)
							.setThumbnail(orbioslogo)
							.setTitle("Puzzle Link")
							.setURL("http://orbios.netau.net/Orbiospuzzle/")
							.setDescription("I wish you the best of luck with the puzzle!");
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
		}
	} catch (e) {
		console.error(e);
	}

	return;
};
