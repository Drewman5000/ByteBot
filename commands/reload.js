const { prefix } = require('../config.json');

module.exports = {
	name: 'reload',
	description: 'Reloads a command',
	usage: '[command name]',
	args: true,
	execute(message, args) {
		const commandIndex = args.indexOf(args.find((arg) => { return arg === '!reload';}));
		let commandName = '';
		const nextWord = args[commandIndex + 1];
		if (!nextWord) {
			return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
		}
		const checkPrefix = new RegExp('(' + prefix + ')', 'i');
		if (checkPrefix.exec(args[commandIndex + 1])) {
			commandName = nextWord.slice(prefix.length).toLowerCase();
		}
		else {
			commandName = nextWord.toLowerCase();
		}
		const command = message.client.commands.get(commandName) || message.client.commands.find(c => c.aliases && c.aliases.includes(commandName));
		if (!command) {
			return message.channel.send(`There is no command with name or alias \`${commandName}\`, ${message.author}!`);
		}

		delete require.cache[require.resolve(`./${command.name}.js`)];

		try {
			const newCommand = require(`./${command.name}.js`);
			message.client.commands.set(newCommand.name, newCommand);
			message.channel.send(`Command \`${command.name}\` was reloaded!`);
		}
		catch (error) {
			console.error(error);
			message.channel.send(`There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``);
		}
	},
};