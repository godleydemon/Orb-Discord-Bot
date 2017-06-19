require('../bot.js');

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


module.exports.info = async(message) => {
	try {
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

			if (userinput.startsWith('info ')) {
				let subject = userinput.replace('info ', '').toLowerCase();

				if (subject === 'recruit' || subject === 'recruiting' || subject === 'recruitment') {
					channel.send('**To recruit, you simply need to:** \n\n**1.** Create a permanent invite link. \n**2.** Copy the little code after the last **/** of the invite link. \n**3.** Send the link to a bunch of people. \n**4.** Check your recruitment progress by typing **;rprog ** followed by the little code... Ex: **;rprog abcdefg12** \n\nOnce you have recruited 5 people, type the command again, and you will have the **Recruiter** role!');
				}
			}
		}
	} catch (e) {
		console.error(e);
	}

	return;
};
