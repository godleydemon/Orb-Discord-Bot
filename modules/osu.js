require('../bot.js');
const config = require("../JSON/config.json");
const osuapikey = config.osu_apikey;


module.exports.osu = async(Discord, message, userinput, self, pinkhex, GenericErrorMessage, getJSON) => {
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
					let embed = new Discord.RichEmbed()
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
						let osuUser = response;

						if (osuUser[0] != null) {
							let embed = new Discord.RichEmbed()
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
			} else if (command.startsWith('rp ')) {
				let username = command.replace('rp ', '');

				getJSON('https://osu.ppy.sh/api/get_user_recent?k=' + osuapikey + '&u=' + username, function(err, res) {
					if (err) return console.log(err);
					if (!res) return;
					let result = res

					let totalHits = (result[0].count50 * 50) + ((result[0].count100 + result[0].countkatu) * 100) + ((result[0].count300 + result[0].countgeki) * 300);
					let hitCount = (result[0].countmiss * 0 / 6) + (result[0].count50 * 1 / 6) + ((result[0].count100 + result[0].countkatu) * 2 / 6) + ((result[0].count300 + result[0].countgeki) * 6 / 6);
					let accuracy = totalHits / (hitCount * 300);
					console.log(accuracy)

					getJSON('https://osu.ppy.sh/api/get_scores?k=' + osuapikey + '&b=' + result[0].beatmap_id + '&u=' + result[0].user_id, function(err, res) {
						if (err) return console.log(err);
						if (!res) return;
						let findpp = res
						console.log(findpp[0]);
						getJSON('https://osu.ppy.sh/api/get_beatmaps?k=' + osuapikey + '&b=' + result[0].beatmap_id, function(err, res) {
							if (err) return console.log(err);
							if (!res) return;
							console.log(res[0]);

							let embed = new Discord.RichEmbed()
								.setAuthor("osu! result:", "http://vignette4.wikia.nocookie.net/cytus/images/5/51/Osu_icon.png/revision/latest?cb=20141012114218")
								.setColor(pinkhex)
								.setDescription("\n" + '|' +
									'**Beatmap:**  ' + res[0].title + '|' + '**Version:**  ' + res[0].version + '|' +
									'**Score:**  ' + result[0].score + '|' + '**Max Combo:**  ' + result[0].maxcombo + '|' + '**Rank Achieved:**  ' + result[0].rank + '|' + '**Accuracy:**  ' + parseFloat(accuracy).toFixed(2) + '|' +
									'**Star rating:**  ' + parseFloat(res[0].difficultyrating).toFixed(2) + '|' + '**OD:**  ' + res[0].diff_overall + '**CS:**  ' + res[0].diff_size +
									'**AR:**  ' + res[0].diff_approach + '**HP:**  ' + res[0].diff_drain + '|' + '**Pp gained:**  ' + findpp[0].pp + '|')
								.setThumbnail('https://b.ppy.sh/thumb/' + res[0].beatmapset_id + 'l.jpg')
								.setURL('https://osu.ppy.sh/b/' + res[0].beatmap_id + '&m=0');

							channel.send({
									embed
								})
								.catch(function() {
									channel.send(GenericErrorMessage, true)
								})
						})
					})
				})
			}
		}
	} catch (e) {
		console.error(e);
	}

	return;
};
