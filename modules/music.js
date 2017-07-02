require('../bot.js');
const youtubedl = require('youtube-dl');
const YouTube = require("youtube-node");
const youTube = new YouTube();
const config = require("../JSON/config.json");
const fs = require('fs');

youTube.setKey(config.youtube_key);

module.exports.music = async(bot, message, userinput, self) => {
	try {
		const author = await message.author;
		const content = await message.content;
		const channel = await message.channel;
		const member = await message.guild.fetchMember(message.author);

		//Downloads and plays videos from youtube.
		if (userinput.startsWith('play ')) {
			if (author.id != owner_id) return channel.send(":broken_heart: This command is only for my master.");
			if (!member.voiceChannel) return message.channel.send('You\'re not in a voice channel.');
			const song = './song.mp3';
			const voiceChannel = member.voiceChannel;
			let video;

			var userinput = userinput.replace('play ', '');
			let ytvid;

			youTube.search(userinput, 1, function(err, res) {
				if (err) return err
				let rawData = JSON.stringify(res, null, 1);
				let parsed = JSON.parse(rawData);
				let msgid;

				if (parsed.items[0]) {
					if (parsed.items[0].id.kind === 'youtube#channel') {
						channel.send('Unfortunately I am not able to play a YouTube channel.');
					} else if (parsed.items[0].id.kind === 'youtube#video') {
						ytvid = "https://www.youtube.com/watch?v=" + parsed.items[0].id.videoId;
					} else if (parsed.items[0].id.kind === 'youtube#playlist') {
						channel.send('I am currently not able to play playlists...');
					}
				} else {
					channel.send(author + " Something went wrong... Please try again!");
				}
			});


			let _flagCheck = setInterval(function() { //Will keep waiting until ytvid is defined and then will continue.
				if (ytvid) {
					clearInterval(_flagCheck);

					channel.send("```ini\n[ Fetching Song ]\n```")
						.then(function() {
							msgid = bot.user.lastMessageID;
						});

					youtubedl(ytvid, ['--format=250', '--no-warnings'],
						function(err) {

							if (err) {

								var _waitMsgID = setInterval(function() { //Will keep waiting until msgid is defined and then will continue.
									if (msgid) {
										clearInterval(_waitMsgID);

										return channel.fetchMessage(msgid)
											.then(msg => msg.edit("```ini\n[ Audio could not be retrieved from the video ]\n```"));
									}
								}, 200);

							} else {
								video = youtubedl(ytvid, ['--format=250', '--no-warnings']);
							}
						});
				}
			}, 200);

			let time = Date.now();
			var _wait = setInterval(function() { //Will keep waiting until video is defined and then will continue.
				if (video) {
					clearInterval(_wait);

					let title;
					let size;
					//Downloading the song.
					video.on('info', function(info) {
						title = info.title;
						size = info.size;

						var _waitMsgID = setInterval(function() { //Will keep waiting until msgid is defined and then will continue.
							if (msgid) {
								clearInterval(_waitMsgID);

								channel.fetchMessage(msgid)
									.then(msg => msg.edit("```ini\n[ Downloading: " + title + " ]\n```"));
							}
						}, 200);

					});

					const writestream = fs.createWriteStream(song);
					video.pipe(writestream); //Writing the song to a file.

					//Joins the voice channel after the song is done downloading.
					video.on('end', function() {
						channel.fetchMessage(msgid)
							.then(msg => msg.edit("```ini\n[ Playing: " + title + " ]\n```"));
						voiceChannel.join()
							.then(connection => {
								voice_connection = connection;
								const dispatcher = connection.playFile(song);
								dispatcher.setVolume(1);
							});
					});

				} else if (Date.now() - time > 20000) {
					clearInterval(_wait);
					return;
				}
			}, 200);

			return;
		}

		//Stops music
		if (userinput === 'stop') {
			if (author.id != owner_id) return channel.send(":broken_heart: This command is only for my master.");

			if (voice_connection) {
				voice_connection.disconnect();
				channel.send("```ini\n[ Music stopped ]\n```");
			} else {
				channel.send("```ini\n[ No music is playing ]\n```");
			}
		}
	} catch (e) {
		console.error(e);
	}

	return;
};
