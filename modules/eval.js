require("../bot.js");

module.exports.eval = async(Discord, bot, message, userinput, orangehex, owner_id, GenericErrorMessage) => {
	try {
		const author = await message.author;
		const content = await message.content;
		const logchannel = await bot.channels.get("271569777686740992");
		const channel = await message.channel;
		const member = await message.guild.fetchMember(message.author);


		//Debugs any JavaScript code using eval.
		if (userinput.startsWith('eval ')) {
			if (author.id !== owner_id) return;
			let code = userinput.replace('eval ', '');
			let res = await String(eval(code));
			let thumbnail = "https://media.giphy.com/media/Hh6TxIOIh6o36/giphy.gif";

			try {
				if (res != "undefined" && res != "null" && res != "") {
					let embed = new Discord.RichEmbed()
						.setColor(orangehex)
						.setAuthor("Code Evaluation", "https://d30y9cdsu7xlg0.cloudfront.net/png/13694-200.png")
						.setThumbnail(thumbnail)
						.setDescription('**Eval Result:** :white_check_mark:\n\n**Input:**\n```\n' + code + '\n```\n**Output:**\n```js\n' + res + '\n```');

					channel.send({
							embed
						})
						.catch(function() {
							channel.send(GenericErrorMessage)
						});
				} else {
					let embed = new Discord.RichEmbed()
						.setColor(orangehex)
						.setAuthor("Code Evaluation", "https://d30y9cdsu7xlg0.cloudfront.net/png/13694-200.png")
						.setThumbnail(thumbnail)
						.setDescription('**Eval Result:** :x:\n\n**Input:**\n```\n' + code + '\n```\n**Error:**\n```js\n' + res + '\n```');

					channel.send({
							embed
						})
						.catch(function() {
							channel.send(GenericErrorMessage)
						});
				}
			} catch (e) {
				console.log(e.name);
				console.log(e.message);

				let embed = new Discord.RichEmbed()
					.setColor(orangehex)
					.setAuthor("Code Evaluation", "https://d30y9cdsu7xlg0.cloudfront.net/png/13694-200.png")
					.setThumbnail(thumbnail)
					.setDescription('**Eval Result:** :x:\n\n**Input:**\n```\n' + code + '\n```\n**Error:**\n```' + e.name + '\n' + e.message + '```');

				channel.send({
						embed
					})
					.catch(function() {
						channel.send(GenericErrorMessage)
					});
			}

			return;
		}
	} catch (e) {
		console.log(e);
	}
};
