module.exports = {
	name: '8ball',
	description: 'Magic Eight Ball Replies',
	execute(msg, args) {
		const options = require('./eightBallOptions.json');
		const randomNum = (min, max) => {
  			return Math.floor(Math.random() * (max - min + 1) ) + min;
		}
		let reply = "";
		let result = randomNum(0, 19);
		let publish = options.eightBall[result];

		reply = publish;
		

		msg.channel.send(reply);
	},
};