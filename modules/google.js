require('../bot.js');
const scraper = require("google-search-scraper");

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

module.exports.google = async(Discord, message) => {
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
	}
};
