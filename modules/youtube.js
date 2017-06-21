require('../bot.js');
const YouTube = require("youtube-node");
const youTube = new YouTube();
const config = require("../config.json");
youTube.setKey(config.youtube_key);


module.exports.youtube = async(Discord, message, userinput, redhex) => {
	try {
		const author = await message.author;
		const content = await message.content;
		const channel = await message.channel;
		const member = await message.guild.fetchMember(message.author);


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
							.setColor(redhex)
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
							.setColor(redhex)
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
	} catch (e) {
		console.error(e);
	}

	return;
};
