const { version } = require('../config.json');

module.exports = {
	name: 'version',
	description: 'Returns Current Verions',
	execute(msg) {
		
		const reply = 'The current version is ' + version;
		
		msg.channel.send(reply);
	},
};