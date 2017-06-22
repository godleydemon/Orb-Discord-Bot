require('../bot.js');
const getJSON = require('get-json');
const config = require("../config.json");
const osuapikey = config.osu_apikey;


module.exports.osu = async(Discord, message, userinput, self, pinkhex, GenericErrorMessage) => {
	try {
		const author = await message.author;
		const content = await message.content;
		const channel = await message.channel;
		const member = await message.guild.fetchMember(message.author);

		//Sends an embedded message containing the osu user's stats, and their profile picture or their latest play info.
		if (userinput.startsWith('osu ')) {
			let command = userinput.replace('osu ', '');

			if (command.startsWith('u ')) {
				let username = command.replace('u ', '');

				if (username === self) {
					var embed = new Discord.RichEmbed()
						.setAuthor("osu! result:", "http://vignette4.wikia.nocookie.net/cytus/images/5/51/Osu_icon.png/revision/latest?cb=20141012114218")
						.setColor(pinkhex)
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
								.setColor(pinkhex)
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
				let usernameplays = command.replace('p ', '');

				getJSON('https://osu.ppy.sh/api/get_user_recent?k=' + osuapikey + '&u=' + usernameplays, function(error, findbeatmap) {
					if (error) console.log(error);
					var beatmapID = findbeatmap;

					if (beatmapID[0] != null) {
						NewBeatmapID = beatmapID[0].beatmap_id
						getJSON('https://osu.ppy.sh/api/get_beatmaps?k=' + osuapikey + '&u=' + NewBeatmapID, function(error, response) {
							if (error) console.log(error);
							var newID = response;

							console.log(newID[0])
							var embed = new Discord.RichEmbed()
								.setAuthor("osu! result:", "http://vignette4.wikia.nocookie.net/cytus/images/5/51/Osu_icon.png/revision/latest?cb=20141012114218")
								.setColor(pinkhex)
								.setDescription(
									'***\nBeatmap:***  ' + newID[0].title + '***Version:***  ' + newID[0].version +
									'\n***Score:***  ' + beatmapID[0].score + '***Max Combo:***  ' + beatmapID[0].maxcombo + '***Rank:***  ' + beatmapID[0].rank +
									'\n***Star rating:***  ' + parseFloat(newID[0].difficultyrating) + '***OD:***  ' + newID[0].diff_overall + '***CS:***  ' + newID[0].diff_size +
									'***AR:***  ' + newID[0].diff_approach + '***HP:***  ' + newID[0].diff_drain)
								.setThumbnail('https://b.ppy.sh/thumb/' + newID[0].beatmapset_id + 'l.jpg')
								.setURL('https://osu.ppy.sh/b/' + beatmapID[0].beatmap_id + '&m=0');

							channel.send({
									embed
								})
								.catch(function() {
									channel.send(GenericErrorMessage, true)
								})
						})
					}
				})
			}
		}
	} catch (e) {
		console.error(e);
	}

	return;
};
