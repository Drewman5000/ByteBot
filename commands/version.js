module.exports = {
	name: 'version',
	description: 'Returns Current Verions',
	execute(msg, args, list, prefix, message, version) {
		
		let reply = `The current version is ` + version;
		
		msg.channel.send(reply);
	},
};