module.exports = {
	name: 'help',
	description: 'This Help Dialog',
	execute(msg, args, list, prefix) {
		//const options = require('./eightBallOptions.json');
		let helpPrint = '';
		let sorted = Object.entries(list).sort((a, b) => a[0].localeCompare(b[0]));

		for (const [key, value] of sorted) {
			helpPrint += '\n Command: ' + list[key].name + '\t\t\tDesription: ' + list[key].description;
		}
		
		let reply = `Here are the commands:\n
		Use the prefix  \`\`\``+prefix+`\`\`\`  infront of each command in chat! \n` + helpPrint;
		
		msg.channel.send(reply);
	},
};