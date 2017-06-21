require("../bot.js");

module.exports.eval = async(Discord, bot, message, userinput, bluehex, owner_id) => {
	try {
		const author = await message.author;
		const content = await message.content;
		const logchannel = await bot.channels.get("271569777686740992");
		const channel = await message.channel;
		const member = await message.guild.fetchMember(message.author);


		//Debugs any JavaScript code using eval.
		if (userinput.startsWith('eval ')) {
			if (author.id !== owner_id) return;
			let code;
			let res;
			let lastmsg = message;
			let thumbnail = "https://media.giphy.com/media/Hh6TxIOIh6o36/giphy.gif";

			try {
				code = userinput.replace('eval ', '');
				res = await String(eval(code));

				if (res.length <= 500) {
					let embed = new Discord.RichEmbed()
						.setColor(bluehex)
						.setAuthor("Code Evaluation", "https://d30y9cdsu7xlg0.cloudfront.net/png/13694-200.png")
						.setThumbnail(thumbnail)
						.setDescription('**Eval Result:** :white_check_mark:\n\n**Input:**\n```\n' + code + '\n```\n**Output:**\n```js\n' + res + '\n```');

					lastmsg.delete();
					channel.send({
							embed
						})
						.catch(function() {
							channel.send(GenericErrorMessage)
						});
				} else {
					let embed = new Discord.RichEmbed()
						.setColor(bluehex)
						.setAuthor("Code Evaluation", "https://d30y9cdsu7xlg0.cloudfront.net/png/13694-200.png")
						.setThumbnail(thumbnail)
						.setDescription('**Eval Result:** :x:\n\n**Input:**\n```\n' + code + '\n```\n**Output:**\n```The output was over 500 chars, so it will not be sent here.```');

					lastmsg.delete();
					channel.send({
							embed
						})
						.catch(function() {
							channel.send(GenericErrorMessage)
						});
				}
			} catch (e) {
				let embed = new Discord.RichEmbed()
					.setColor(bluehex)
					.setAuthor("Code Evaluation", "https://d30y9cdsu7xlg0.cloudfront.net/png/13694-200.png")
					.setThumbnail(thumbnail)
					.setDescription('**Eval Result:** :x:\n\n**Input:**\n```\n' + code + '\n```\n**Output:**\n```undefined```');

				lastmsg.delete();
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
