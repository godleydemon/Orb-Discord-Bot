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
				channel.send('**To recruit, you simply need to:** \n\n**1.** Create a permanent invite link. \n**2.** Copy the little code after the last **/** of the invite link. \n**3.** Send the link to a bunch of people. \n**4.** Check your recruitment progress by typing **;rprog ** followed by the little code... Ex: **;rprog abcdefg12** \n\nOnce you have recruited 5 people, type the command again, and you will have the **Recruiter** role!');
			}
		}
	} catch (e) {
		console.error(e);
	}

	return;
};
