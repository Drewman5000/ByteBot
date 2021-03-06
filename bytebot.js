require('dotenv').config();
const fs = require('fs');
const { prefix } = require('./config.json');
const Discord = require('discord.js');
const bytebot = new Discord.Client();
bytebot.commands = new Discord.Collection();
const bytebotCommands = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of bytebotCommands) {
  const command = require(`./commands/${file}`);
  bytebot.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();
const TOKEN = process.env.TOKEN;

bytebot.once('ready', () => {
  console.info(`Logged in as ${bytebot.user.tag}!`);
});

bytebot.on('message', (msg) => {
  const message = msg.content;
  const containsPrefix = new RegExp(prefix, 'gi');
  const checkMessage = containsPrefix.exec(message);
  if (!checkMessage || msg.author.bot) return;
  const args = msg.content.trim().split(/\s+/);
  for (const item in bytebotCommands) {
    // probably an easier way to get a list of bytebot commands here...
    const commandTest = bytebotCommands[item].toString().toLowerCase().substring(0, bytebotCommands[item].length - 3);
    const regexp = new RegExp(
      '(' + prefix + ')(\\b(' + commandTest + ')\\b)',
      'gi',
    );
    const commandIndex = args.indexOf(args.find((arg) => { return arg === commandTest;}));
    const nextWord = args[commandIndex + 1];
    let m;

    while ((m = regexp.exec(message)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regexp.lastIndex) {
        regexp.lastIndex++;
      }
      // The result can be accessed through the `m`-variable.
      m.forEach((match, groupIndex) => {
        if (groupIndex === 2) {
          const commandName = match.toLowerCase();
          console.info(`Called command: ${commandName}`);
          // check command list against the regex match commandName
          const command = bytebot.commands.get(commandName) || bytebot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
          // if there's no command, exit.
          if (!command) return;

          if (command.guildOnly && msg.channel.type === 'dm') {
            return msg.reply('I can\'t execute that command inside DMs!');
          }

          if (command.args && !nextWord) {
            let reply = `You didn't provide any arguments, ${msg.author}!`;
            if (command.usage) {
              reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
            }
            return msg.channel.send(reply);
          }

          if (!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new Discord.Collection());
          }

          const now = Date.now();
          const timestamps = cooldowns.get(command.name);
          const cooldownAmount = (command.cooldown || 3) * 1000;

          if (timestamps.has(msg.author.id)) {
            const expirationTime = timestamps.get(msg.author.id) + cooldownAmount;

            if (now < expirationTime) {
              const timeLeft = (expirationTime - now) / 1000;
              return msg.reply(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
            }
          }

          timestamps.set(msg.author.id, now);
          setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount);

          try {
            command.execute(msg, args);
          }
          catch (error) {
            console.error(error);
            msg.reply('There was an error trying to execute that command!');
          }
        }
      });
    }
  }
});

bytebot.login(TOKEN);
