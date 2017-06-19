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

module.exports.orb = async(Discord, message) => {
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

			//A bunch of commands for Orbios
			if (userinput.startsWith('orb ')) {
				if (message.guild != null) {
					if (message.guild.id === orbios_id || message.guild.id === debugServer_id) {
						var what = userinput.replace('orb ', '');

						if (what === "cmds") {
							var embed = new Discord.RichEmbed()
								.setColor(redhex)
								.setTitle("Orbios Commands")
								.setThumbnail(orbioslogo)
								.setDescription("" +
									"\n**site** gives a link to the website" +
									"\n\n**apply** gives a link to the staff app" +
									"\n\n**invite** gives a permanent invite link to Orbios" +
									"\n\n**twitch** gives a link to Orbios' twitch where all our streamers are hosted!" +
									"\n\n**roles** lists all roles available to self-assign" +
									"\n\n**sr** assigns a role if it is from the list" +
									"\n\n**custom** sets a custom message for whatever follows it (gn, gm)" +
									"\n\n**tournament** gives a permanent invite link to the Orbios tournament server" +
									"\n\n**puzzle**  gives a link to the puzzle section of the website"
								);
						} else if (what === "site") {
							var embed = new Discord.RichEmbed()
								.setColor(redhex)
								.setTitle("Orbios Website")
								.setURL("http://orbios.netau.net/")
								.setThumbnail(orbioslogo)
								.setDescription("The home to all sorts of useful and fancy things!");
						} else if (what === "apply") {
							var embed = new Discord.RichEmbed()
								.setColor(redhex)
								.setTitle("Staff Application Download")
								.setURL("https://mega.nz/#!NhVmHKbB!2TNVhbV2EZruBylxZaZ4lgWosJG9F5-QfrajFVdlo5s")
								.setThumbnail(orbioslogo)
								.setDescription("To apply for staff, download and run the program, and follow the prompts/answer the questions!");
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
						} else if (what === "twitch") {
							var embed = new Discord.RichEmbed()
								.setColor(redhex)
								.setThumbnail(orbioslogo)
								.setTitle("Twitch Channel")
								.setURL("https://www.twitch.tv/animusgroup")
								.setDescription("I hope you enjoy watching our streamers!");
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
		}
	} catch (e) {
		console.error(e);
	}

	return;
};
