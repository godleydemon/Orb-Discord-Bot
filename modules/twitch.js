require('../bot.js');
const config = require("../config.json");
const Twitch = require("twitch-api");
const twitch = new Twitch({
	clientId: config.twitch_clientid,
	clientSecret: '',
	redirectUri: 'http://localhost'
});


module.exports.twitch = async(Discord, message, userinput, purplehex) => {
	try {
		const author = await message.author;
		const content = await message.content;
		const channel = await message.channel;
		const member = await message.guild.fetchMember(message.author);


		//Twitch user search
		if (userinput.startsWith('twitch ')) {
			var user = userinput.replace('twitch ', '');
			if (!user) return;

			twitch.searchStreams({
				query: user,
				limit: 1
			}, function(err, res) {
				if (err) return console.log(err);

				//If the stream is not live, grab the channel data instead
				if (!res.streams[0]) {
					twitch.searchChannels({
						query: user,
						limit: 1
					}, function(err, res) {
						if (err) return console.log(err);

						var embed = new Discord.RichEmbed()
							.setColor(purplehex)
							.setAuthor(res.channels[0].display_name, "http://pre06.deviantart.net/1a10/th/pre/f/2015/291/5/1/logo_twitch_iosversion_by_akiruuu-d9djk9s.png")
							.setThumbnail(res.channels[0].logo)
							.setURL(res.channels[0].url)
							.setDescription(res.channels[0].status)
							.setFooter("Followers: " + res.channels[0].followers + " | Views: " + res.channels[0].views);

						channel.send({
								embed
							})
							.catch(function() {
								channel.send(GenericErrorMessage)
							});
					})
				}
				//If the stream is live, grab the stream data.
				else {
					var embed = new Discord.RichEmbed()
						.setColor(purplehex)
						.setAuthor(res.streams[0].channel.display_name, "http://pre06.deviantart.net/1a10/th/pre/f/2015/291/5/1/logo_twitch_iosversion_by_akiruuu-d9djk9s.png")
						.setThumbnail(res.streams[0].channel.logo)
						.setURL(res.streams[0].channel.url)
						.setDescription(res.streams[0].channel.status)
						.setFooter("Followers: " + res.streams[0].channel.followers + " | Viewers: " + res.streams[0].viewers + " | Game: " + res.streams[0].game);

					channel.send({
							embed
						})
						.catch(function() {
							channel.send(GenericErrorMessage)
						});
				}
			});
		}
	} catch (e) {
		console.error(e);
	}

	return;
};
