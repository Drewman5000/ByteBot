module.exports = {
	name: "byte",
	description: "Yes or No.",
	execute(msg, args) {
		const choices = require("./eightBallOptions.json");
		const coinFlip = (min, max) => {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		};
		let reply = "";
		let publish = choices.no[coinFlip(0, 6)];
		let result = coinFlip(0, 1);
		if (result) {
			publish = choices.yes[coinFlip(0, 4)];
		}

		reply = result ? "Yes. :bitYes: " + publish : "No. :bitNo: " + publish;

		msg.channel.send(reply);
	},
};
