require('../bot.js');
const randomAnimeWallpapers = require('random-anime-wallpapers');

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


module.exports.wallpaper = async(message) => {
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
		}
	} catch (e) {
		console.error(e);
	}

	return;
};
