require('../bot.js');
const Anime = require('anime-scraper')
	.Anime


module.exports.anime = async(Discord, message, userinput, GenericErrorMessage) => {
	try {
		const author = await message.author;
		const content = await message.content;
		const channel = await message.channel;
		const member = await message.guild.fetchMember(message.author);


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
					console.log(err);
					channel.send(author + ' Anime was not found...')
					if (userinput === 'anime cancer') {
						channel.send(author + " I believe you're looking for a documentary on yourself... Try searching elsewhere.");
					}
				});
		}
	} catch (e) {
		console.error(e);
	}

	return;
};
