require('../bot.js');

module.exports.custom = async(message, userinput, owner_id, fs) => {
	try {
		const author = await message.author;
		const content = await message.content;
		const channel = await message.channel;
		const member = await message.guild.fetchMember(message.author);

		if (userinput.startsWith("custom gn ")) {
			let finalmsg = userinput.replace('custom gn ', '');

			message.guild.members.get(owner_id)
				.send(author.username + " Has requested their GN message to be set to `" + finalmsg + "`");
			channel.send(author + " Your request to get a custom GN message has been sent to Zeval. It may take up to 24 hours to be implemented (if accepted). But usually, if he is online, it will only take 1-5 hours at most.");
			return;
		}

		if (userinput.startsWith("custom gm ")) {
			let finalmsg = userinput.replace('custom gm ', '');

			fs.readFile('../test.json', 'utf8', function readFileCallback(err, data) {
				if (err) {
					console.log(err);
				} else {
					let obj = JSON.parse(data);
					obj.table.push({
						id: author.id,
						GMMessage: finalmsg
					});
					json = JSON.stringify(obj);
					fs.writeFile('../test.json', json, 'utf8', callback);
				}
			});
			console.log(finalmsg);
		}

	} catch (e) {
		console.error(e);
	}

	return;
};
