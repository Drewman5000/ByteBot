module.exports = {
	name: "speak",
	description: "?",
	execute(msg, args) {
		const choices = require("./eightBallOptions.json");
		const coinFlip = (min, max) => {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		};
		let reply = "";
		let publish = choices.speak[coinFlip(0, 1)];
		let result = coinFlip(0, 1);
		if (result) {
			publish = choices.speak[coinFlip(0, 1)];
		}

		reply = result ? "/tts Yes. " + choices.speak[0] : "/tts No. "; // + publish;

		msg.channel.send(reply);
	},
};