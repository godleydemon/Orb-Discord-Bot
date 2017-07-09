require('../bot.js');
const youtubedl = require('youtube-dl');
const YouTube = require("youtube-node");
const youTube = new YouTube();
const YoutubeDL = require('youtube-dl');
const ytdl = require('ytdl-core');
const config = require("../JSON/config.json");
const fs = require('fs');
const pinkhex = "#E49AA9";
const pinkinteger = 0xE49AA9;
const purplehex = "#8042f4";
const purpleinteger = 0x8042f4;
const redhex = "#FF044A";
const redinteger = 0xFF044A;
const queuepath = "./music/playlist.json";
var VOLUME = 10

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
///Stunts shit
if (userinput.startsWith('music request ')) {
		const voiceChannel = message.member.voiceChannel;
		if (message.member.voiceChannel === undefined) return message.channel.send(wrap('You\'re not in a voice channel.'));
		var SUFFIX = message.content.replace('music request ', '');
		message.channel.send(wrap('Searching...'))
			.then(playlistmsg => {

				SEARCHSTRING = 'ytsearch1:' + SUFFIX;

				if (SUFFIX[0].includes("http")) {
					SEARCHSTRING = SUFFIX
				}

				YoutubeDL.getInfo(SEARCHSTRING, ['-q', '--no-warnings', '--force-ipv4'], (err, info) => {
					let idealFormatIds = ["251", "250", "249", "171", "140", "141", "127", "128", "82", "83", "100", "84", "85", "5", "18", "43", "22", "36", "17", "http_mp3_128_url"];
					TITLE = info.title
					THUMBNAIL = info.thumbnail
					DURATION = info.duration
					FORMATS = info.formats
					DESCRIPTION = info.description.split("\n")
						.slice(0, 5)
						.join("\n");
					let formatMap = info.formats.map(f => getFormatId(f));
					for (let itag of idealFormatIds) {
						if (formatMap.indexOf(itag) > -1) {
							let format = info.formats[formatMap.indexOf(itag)];
							format.encoding = getEncoding(format);
							format.container = getContainer(format);
							URL = format.url;
							break;
						}
					}
					queue.push({
						title: TITLE,
						url: URL,
						duration: DURATION,
						thumb: THUMBNAIL,
						desc: DESCRIPTION,
						size: info.size,
						user: message.author.username,
						id: info.id
					});
					fs.writeFileSync(queuepath, JSON.stringify(queue, null, 4));
					playlistmsg.edit(wrap('added \"' + TITLE + '\" to queue by: ' + message.author.username))
				});
			});
	}
	function is_queue_empty() {
		return queue.length === 0;
	}

	function sleep(time) {
		return new Promise((resolve) => setTimeout(resolve, time));
	}

	function play_list_msg() {
		message.channel.send("", {
			embed: {
				color: purpleinteger,
				title: "Playing: " + queue[0].title,
				thumbnail: {
					url: queue[0].thumb
				},
				url: queue[0].url,
				description: queue[0].desc,
				footer: {
					text: "Volume: " + VOLUME + "% | Duration: " + queue[0].duration + " | Requested by: " + queue[0].user
				}
			}
		});
	}

	function play_list_play() {
		const voiceChannel = message.member.voiceChannel
		if (message.member.voiceChannel === undefined) return message.channel.send(wrap('You\'re not in a voice channel.'));
		if (!is_queue_empty()) {
			console.log("Playing: " + queue[0].title)
			voiceChannel.join()
				.then(connection => {
							dispatcher2 = connection.playFile("./music/" + queue[0].id + ".flv")
							play_list_msg()
							dispatcher2.setVolume(VOLUME / 100);
							dispatcher2.on('end', () => {
								fs.exists('./music/' + TODELETE + '.flv', function(exists, err) {
									if (exists) {
										fs.unlink('./music/' + TODELETE + '.flv');
									} else if (err) {
										console.error("Error occurred while trying to remove file");
									} else {
										console.log("File not found, so not deleting.");
									}
								});
								if (!is_queue_empty()) {
									dispatcher2 = null
									queue.shift();
									sleep(2000)
										.then(() => {
											TODELETE = null
											fs.writeFileSync(queuepath, JSON.stringify(queue, null, 4));
												if (!is_queue_empty()) {
													play_list_download()
												} else {
													message.channel.send(wrap("You've reached the end of the playlist!"));
												}
										});
								} else {
									dispatcher2 = null
									message.channel.send(wrap("You've reached the end of the playlist!"));
								}
							});
				});
		} else {
			message.channel.send(wrap("You've reached the end of the playlist!"));
		}
	}

	function play_list_download() {
		MUSICPLAY = YoutubeDL(queue[0].url, ['--no-warnings']);
		var song = fs.createWriteStream("./music/" + queue[0].id + ".flv")
		MUSICPLAY.pipe(song)
		song.on('finish', function(){
		play_list_play()
		TODELETE = queue[0].id
		});
	}
	function wrap(text) {
		return '```\n' + text.replace(/`/g, '`' + String.fromCharCode(8203)) + '\n```';
	}

	function sleep(time) {
		return new Promise((resolve) => setTimeout(resolve, time));
	}

	function tick() {
		for (let i = 0; i < servers.length; i++) {
			for (let j = 0; j < servers[i].twitchChannels.length; j++) {
				for (let k = -1; k < servers[i].discordChannels.length; k++) {
					if (servers[i].twitchChannels[j]) {
						callApi(servers[i], servers[i].twitchChannels[j], apiCallback, true);
					}
				}
			}
		}
	}
	function getFormatId(info) {
		return info.itag || info.format_id;
	}

	function isContainer(info, container) {
		return getContainer(info) === container;
	}

	function getContainer(info) {
		return info.ext || info.container;
	}

	function getEncoding(info) {
		return info.encoding || info.audioEncoding || info.acodec;
	}

	function isEncodedAs(info, encoding) {
		return getEncoding(info) === encoding;
	}
	if (userinput.startsWith('music list play')) {
		message.channel.send(wrap("Beginning playlist..."))
			.then(playing => {
				if (!is_queue_empty()) {
					play_list_download()
				} else {
					channel.fetchMessage(msgid)
						.then(msg => msg.edit(wrap("No playlist to play\nAdd/Create a new playlist with\n!ab request url/name")));
				}
			});
	}

	if (message.content.toLowerCase().includes("what's playing") || message.content.toLowerCase().includes("whats playing")) {
		play_list_msg()
	}

	if (userinput.startsWith('music next')) {
		const voiceConnection = client.voiceConnections.find(val => val.channel.guild.id == message.guild.id);
		dispatcher2 = voiceConnection.player.dispatcher;
		if (dispatcher2 !== null) {
			dispatcher2.end();
		} else {
			message.channel.send(wrap("No playlist to work with!"))
		}
	}
///end of stunts shit




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
