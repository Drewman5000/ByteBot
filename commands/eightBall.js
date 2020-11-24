module.exports = {
	name: 'eightball',
	aliases: ['8ball', 'eightball'],
	description: 'Magic Eight Ball Replies',
	execute(msg) {
		const options = require('./eightBallOptions.json');
		const randomNum = (min, max) => {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		};
		const result = randomNum(0, 19);
		const publish = options.eightBall[result];

		msg.channel.send(publish);
	},
};