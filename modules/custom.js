require('../bot.js');

module.exports.custom = async(message, userinput, owner_id, fs) => {
	try {
		const author = await message.author;
		const content = await message.content;
		const channel = await message.channel;
		const member = await message.guild.fetchMember(message.author);

		if (userinput.startsWith("custom gn ")) {
			let customMsg = userinput.replace('custom gn ', '');
			let jsonFile = './JSON/personalized_messages.json';

			fs.readFile(jsonFile, function(err, data) {
				if (err) return console.log(err);
				data = JSON.parse(data);

				if (!data[author.id]) {
					data[author.id] = {
						gm: '',
						gn: customMsg
					};

					fs.writeFile(jsonFile, JSON.stringify(data), function(err) {
						if (err) return console.log(err);
					})
				} else {
					data[author.id].gn = customMsg;
					fs.writeFile(jsonFile, JSON.stringify(data), function(err) {
						if (err) return console.log(err);
					})
				}
			})
		}

		if (userinput.startsWith("custom gm ")) {
			let customMsg = userinput.replace('custom gm ', '');
			let jsonFile = './JSON/personalized_messages.json';

			fs.readFile(jsonFile, function(err, data) {
				data = JSON.parse(data);

				if (!data[author.id]) {
					data[author.id] = {
						gm: customMsg,
						gn: ''
					};

					fs.writeFile(jsonFile, JSON.stringify(data), function(err) {
						if (err) return console.log(err);
					})
				} else {
					data[author.id].gm = customMsg;
					fs.writeFile(jsonFile, JSON.stringify(data), function(err) {
						if (err) return console.log(err);
					})
				}
			})
		}

	} catch (e) {
		console.error(e);
	}

	return;
};
