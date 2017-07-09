require('../bot.js');


module.exports.info = async(message, userinput) => {
	try {
		const author = await message.author;
		const content = await message.content;
		const channel = await message.channel;
		const member = await message.guild.fetchMember(message.author);


		if (userinput.startsWith('info ')) {
			let subject = userinput.replace('info ', '').toLowerCase();

			if (subject === 'recruit' || subject === 'recruiting' || subject === 'recruitment') {
				channel.send("**To recruit simply:**\n" +
					+"**1.** Type `;orb invite`\n" +
					"**2.** Copy the invite link\n" +
					"**3.** Get 5 people to join within 24 hours\n" +
					"**4.** ????\n" +
					"**5.** Profit"
				)
			}
		}
	} catch (e) {
		console.error(e);
	}

	return;
};
