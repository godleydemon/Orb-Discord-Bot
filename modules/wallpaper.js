require('../bot.js');
const randomAnimeWallpapers = require('random-anime-wallpapers');


module.exports.wallpaper = async(message, userinput) => {
	try {
		const author = await message.author;
		const content = await message.content;
		const channel = await message.channel;
		const member = await message.guild.fetchMember(message.author);


		//Grabs a random wallpaper or a wallpaper with specific tag(s) if the user adds keyword(s).
		if (userinput === 'wallpaper' || userinput.startsWith('wallpaper ') || userinput.startsWith('wallpapers ')) {
			if (userinput.startsWith('wallpapers ')) {
				var amount = userinput.replace('wallpapers ', '')
					.replace(/\D/g, '');
				if (amount > '10') {
					channel.send(author + ' Maximum of 10 wallpapers allowed...');
					return;
				}


				randomAnimeWallpapers()
					.then(images => {
						var wallpapers = '';

						for (i = 0; i < amount; i++) {
							if (i === 0 && images[i] != null) {
								wallpapers += images[i].full
							} else {
								if (images[i] != null)
									wallpapers += "\n" + images[i].full
							}
						}

						channel.send(author + " Here's " + amount + " random wallpapers;\n" + wallpapers);
					})

			} else if (userinput.startsWith('wallpaper ')) {
				var keywords = userinput.replace('wallpaper ', '');

				randomAnimeWallpapers(keywords)
					.then(images => {
						if (images[0]) {
							channel.send(author + " Here's a wallpaper with the keywords you entered;\n" + images[0].full);
						} else {
							channel.send(author + " There was no (anime) wallpaper found matching those keywords...");
						}
					})
			} else {
				randomAnimeWallpapers()
					.then(images => {
						channel.send(author + " Here's a random wallpaper;\n" + images[0].full);
					})
			}
		}
	} catch (e) {
		console.error(e);
	}

	return;
};
