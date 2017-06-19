require('../bot.js');
const Anime = require('anime-scraper')
	.Anime

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


module.exports.anime = async(Discord, message) => {
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

			//Searches kissanime for the anime the user typed.
			if (userinput.startsWith('anime ')) {
				let animeName = userinput.replace('anime ', '');

				Anime.fromName(animeName)
					.then(function(anime) {
						embed = new Discord.RichEmbed()
							.setColor(greenhex)
							.setThumbnail('https://a.disquscdn.com/get?url=https%3A%2F%2Fyt3.ggpht.com%2F-DE_jE7_tYsM%2FAAAAAAAAAAI%2FAAAAAAAAAAA%2F1RsOaPV6gYY%2Fs900-c-k-no%2Fphoto.jpg&key=0YufbPywZkdsNuUX3df67w')
							.setTitle(anime.name)
							.setURL(anime.url)
							.setDescription(anime.summary);

						channel.send({
								embed
							})
							.catch(function() {
								channel.send(GenericErrorMessage)
							});
					})
					.catch(function(err) {
						channel.send(author + ' Anime was not found...')
						if (userinput === 'anime cancer') {
							channel.send(author + " I believe you're looking for a documentary on yourself... Try searching elsewhere.");
						}
					});
			}
		}
	} catch (e) {
		console.error(e);
	}

	return;
};
