require('../bot.js');
const YouTube = require("youtube-node");
const youTube = new YouTube();
const config = require("../config.json");

youTube.setKey(config.youtube_key);

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

module.exports.youtube = async(Discord, message) => {
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

			//Searches youtube for the specified text, then sends a message with a link to the result it found.
			if (userinput.startsWith('ys ')) {
				userinput = userinput.replace('ys ', '');

				youTube.search(userinput, 1, function(err, res) {
					if (err) return err
					let rawData = JSON.stringify(res, null, 1);
					let parsed = JSON.parse(rawData);

					if (parsed.items[0]) {
						if (parsed.items[0].id.kind === 'youtube#channel') {
							var embed = new Discord.RichEmbed()
								.setAuthor("YouTube Result:", "https://www.youtube.com/yt/brand/media/image/YouTube-icon-full_color.png")
								.setTitle(parsed.items[0].snippet.channelTitle)
								.setColor(bluehex)
								.setDescription("\nhttps://www.youtube.com/channel/" + parsed.items[0].id.channelId);

							channel.send({
									embed
								})
								.catch(function() {
									channel.send(GenericErrorMessage)
								});
						} else if (parsed.items[0].id.kind === 'youtube#video') {
							var embed = new Discord.RichEmbed()
								.setAuthor("YouTube Result:", "https://www.youtube.com/yt/brand/media/image/YouTube-icon-full_color.png")
								.setTitle(parsed.items[0].snippet.title)
								.setColor(bluehex)
								.setImage(parsed.items[0].snippet.thumbnails.medium.url)
								.setDescription("https://www.youtube.com/watch?v=" + parsed.items[0].id.videoId)
								.setFooter(parsed.items[0].snippet.channelTitle);

							channel.send({
									embed
								})
								.catch(function() {
									channel.send(GenericErrorMessage)
								});
						}
					} else {
						channel.send(author + " Something went wrong... Please try again!");
					}
				})
			}
		}
	} catch (e) {
		console.error(e);
	}

	return;
};
