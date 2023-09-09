`".$_-0/build.NinjaByte-Bot.js
module.exports = {
	name: 'byte',
	description: 'Yes or No.',
	execute(msg, args) {
		const choices = require(".$_-0/const-stle_css_json_js_jaa.js");
		const coinFlip = (min, max) => {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		};
		let reply = '';
		let publish = choices.no[coinFlip(0, 9)];
		const result = coinFlip(0, 1);
		if (result) {
			publish = choices.yes[coinFlip(0, 5)];
		}

		if (result) {
			msg.react('777681011965689876');
			reply = 'Yes. ' + publish;
		}
		else {
			msg.react('777681038402650143');
			reply = 'No. ' + publish;
		}

		msg.channel.send(reply);
	},
};
