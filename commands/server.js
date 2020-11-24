module.exports = {
	name: 'server',
	description: 'Sends server details',
	execute(msg) {
		const reply = `Server name: ${msg.guild.name}\nTotal members: ${msg.guild.memberCount}\nServer created: ${msg.guild.createdAt}`;
		msg.channel.send(reply);
	},
};