require('../bot.js');
const scraper = require("google-search-scraper");


module.exports.google = async(Discord, message, userinput, greenhex) => {
	try {
		const author = await message.author;
		const content = await message.content;
		const channel = await message.channel;
		const member = await message.guild.fetchMember(message.author);


		//Searches google for the specified text, then sends a message with a link to the result it found.
		if (userinput.startsWith('gs ')) {
			var userinput = userinput.replace('gs ', '');
			var lastmsg = message;

			var searchoptions = {
				query: userinput,
				host: 'www.google.com.au',
				lang: 'en',
				limit: 1
			};
			var firstSearch = false;
			scraper.search(searchoptions, function(err, url) {
				//this is called for each result
				if (err) {
					console.log(err);
				}

				if (firstSearch === false) {
					var urlArray = url.split(".");
					if (url.includes("www") === false) {
						embed = new Discord.RichEmbed()
							.setColor(greenhex)
							.setAuthor("Google Result:", "http://images.dailytech.com/nimage/G_is_For_Google_New_Logo_Thumb.png")
							.setDescription(url);
					} else {
						embed = new Discord.RichEmbed()
							.setColor(greenhex)
							.setAuthor("Google Result:", "http://images.dailytech.com/nimage/G_is_For_Google_New_Logo_Thumb.png")
							.setTitle(urlArray[1].charAt(0)
								.toUpperCase() + urlArray[1].slice(1))
							.setDescription(url);
					}


					channel.send({
							embed
						})
						.catch(function() {
							channel.send(GenericErrorMessage)
						});
					firstSearch = true;
				}
			});
			return;
		}
	} catch (e) {
		console.log(e);
	}
};
