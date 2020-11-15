module.exports = {
	name: 'help',
	description: 'Magic Eight Ball Replies',
	execute(msg, args) {
		//const options = require('./eightBallOptions.json');
		let reply = "This will be a help dialog";
		
		msg.channel.send(reply);
	},
};