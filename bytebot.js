require('dotenv').config();
const prefix = require('./config.json');
const Discord = require('discord.js');
const bytebot = new Discord.Client();
bytebot.commands = new Discord.Collection();
const bytebotCommands = require('./commands');

Object.keys(bytebotCommands).map(key => {
  bytebot.commands.set(bytebotCommands[key].name, bytebotCommands[key]);
});

const TOKEN = process.env.TOKEN;

bytebot.login(TOKEN);

bytebot.on('ready', () => {
  console.info(`Logged in as ${bytebot.user.tag}!`);
});

bytebot.on('message', msg => {
  if (msg.content.substring(0, 1) == '!') {
  const args = msg.content.substring(1).split(/\s+/);
  const command = args.shift().toLowerCase();
  console.info(`Called command: ${command}`);

  if (!bytebot.commands.has(command)) return;

    try {
      bytebot.commands.get(command).execute(msg, args);
    } catch (error) {
      console.error(error);
      msg.reply('There was an error trying to execute that command!');
    };
  }
});