require('../bot.js');

module.exports.custom = async(message, userinput, owner_id, fs, getJSON) => {
	try {
		const author = await message.author;
		const content = await message.content;
		const channel = await message.channel;
		const member = await message.guild.fetchMember(message.author);

		if (userinput.startsWith("custom gn ")) {
			let customMsg = userinput.replace('custom gn ', '');

			message.guild.members.get(owner_id)
				.send(author.username + " Has requested their GN message to be set to `" + customMsg + "`");
			channel.send(author + " Your request to get a custom GN message has been sent to Zeval. It may take up to 24 hours to be implemented (if accepted). But usually, if he is online, it will only take 1-5 hours at most.");
			return;
		}

		if (userinput.startsWith("custom gm ")) {
			let customMsg = userinput.replace('custom gm ', '');
			getJSON('./test.json', function(err, res) {
				console.log(res);
			})

			/*
			fs.writeFile('./test.json', customMsg, function(err) {
				if (err) return console.log(err);
			});
			*/
			console.log(customMsg);
		}

	} catch (e) {
		console.error(e);
	}

	return;
};
