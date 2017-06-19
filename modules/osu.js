require('../bot.js');
const getJSON = require('get-json');
const config = require("../config.json");

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
const osuapikey = config.osu_apikey;
// --Global declarations-- //

module.exports.osu = async(Discord, message) => {
	try {
		const author = await message.author;
		const content = await message.content;
		const channel = await message.channel;
		const member = await message.guild.fetchMember(message.author);

		//If the message starts with a mention or the prefix assume it's a username and check to see if it is...
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

			//Sends an embedded message containing the osu user's stats, and their profile picture or their latest play info.
			if (userinput.startsWith('osu ')) {
				let command = userinput.replace('osu ', '');

				if (command.startsWith('u ')) {
					let username = command.replace('u ', '');

					if (username === self) {
						var embed = new Discord.RichEmbed()
							.setAuthor("osu! result:", "http://vignette4.wikia.nocookie.net/cytus/images/5/51/Osu_icon.png/revision/latest?cb=20141012114218")
							.setColor(bluehex)
							.setDescription(
								'***\nUsername:***  ' + "Ene" +
								'\n***Country:***  ' + "JP" +
								'\n***Play Count:***  ' + "96182" +
								'\n***Level:*** ' + "102" +
								'\n***Accuracy:***  ' + "100.00%" +
								'\n***Raw PP:***  ' + "16318" +
								'\n***Global Rank:***  ' + '#' + "1" +
								'\n***Country Rank:***  ' + '#' + "1")
							.setThumbnail(botpiconline);

						channel.send({
								embed
							})
							.catch(function() {
								channel.send(GenericErrorMessage, true)
							});
					} else {
						getJSON('https://osu.ppy.sh/api/get_user?k=' + osuapikey + '&u=' + username, function(error, response) {
							if (error) console.log(error);
							var osuUser = response;

							if (osuUser[0] != null) {
								var embed = new Discord.RichEmbed()
									.setAuthor("osu! result:", "http://vignette4.wikia.nocookie.net/cytus/images/5/51/Osu_icon.png/revision/latest?cb=20141012114218")
									.setColor(bluehex)
									.setDescription(
										'***\nUsername:***  ' + osuUser[0].username +
										'\n***Country:***  ' + osuUser[0].country +
										'\n***Play Count:***  ' + osuUser[0].playcount +
										'\n***Level:*** ' + Math.floor(parseFloat(osuUser[0].level)) +
										'\n***Accuracy:***  ' + parseFloat(osuUser[0].accuracy)
										.toFixed(2) + '%' +
										'\n***Raw PP:***  ' + parseFloat(osuUser[0].pp_raw)
										.toFixed(0) +
										'\n***Global Rank:***  ' + '#' + osuUser[0].pp_rank +
										'\n***Country Rank:***  ' + '#' + osuUser[0].pp_country_rank)
									.setThumbnail(`http://a.ppy.sh/${osuUser[0].user_id}`)
									.setURL(`http://osu.ppy.sh/u/${osuUser[0].user_id}`);

								channel.send({
										embed
									})
									.catch(function() {
										channel.send(GenericErrorMessage, true)
									});
							} else {
								channel.send("There doesn't appear to be a user matching that username.", true);
							}
						})
					}
				} else if (command.startsWith('p ')) {
					return channel.send(author + " This feature is currently not implemented.");
				}
			}
		}
	} catch (e) {
		console.error(e);
	}

	return;
};
