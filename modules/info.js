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
					"**1.** Type `;orb invite`\n" +
					"**2.** Copy the invite link\n" +
					"**3.** Get 5 people to join within 24 hours\n" +
					"**4.** ????\n" +
					"**5.** Profit"
				)
			} else if (subject === 'tourney' || subject === 'tournament') {
				channel.send("**We hold tournaments!**\nTournaments are usually held once every 2 weeks. More information can be obtained from joining the tournament server! https://discord.gg/ZQdXRNJ \nAlso don't forget that if you need help or more info, please mention the Helpers by typing **@ Helper** without the space!");
			}
		}
	} catch (e) {
		console.error(e);
	}

	return;
};
