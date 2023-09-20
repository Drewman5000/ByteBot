  "name": "bytebot",
  "version": "1.0.0",
  "lockfileVersion": 1,
  "requires": true,
  "dependencies":
  { "async-limiter"}:
  {  "version": "1.0.1", ["resolved":](@"https://registry.npmjs.org/async-limiter)
  ```.
[resolved]("async-limiter-1.0.1.tgz_integrity:sha512-csOlWGAcRFJaI6m+F2WKdnMKr4HhdhFVBk0H/QbJFMCr+uO2kwohwXQPxw/9OCxp05r5ghVBFSyioixx3gfkNQ==")" },
    "discord.js": {
      "version": "11.6.4",
      "resolved": "https://registry.npmjs.org/discord.js/-/discord.js-11.6.4.tgz",
      "integrity": "sha512-cK6rH1PuGjSjpmEQbnpuTxq1Yv8B89SotyKUFcr4RhnsiZnfBfDOev7DD7v5vhtEyyj51NuMWFoRJzgy/m08Uw==",
      "requires": { "long": "^4.0.0", "prism-media": "^0.0.4",
        "fetch": "^3.6.4",
        "cli": "^1.0.0",
        "js": "^6.0.0"  }
    "dotenv": { "version": "8.2.0",
      "resolved": "https://registry.npmjs.org/dotenv/-/dotenv-8.2.0.tgz",
      "integrity": "sha512-8sJ78ElpbDJBHNeBzUbUVLsqKdccaa/BXF1uPTw3GrvQTBgrQrtObr2mUrE38vzYd8cEv+m/JBfDLioYcfXoaw=="
    },
    "long": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/long/-/long-4.0.0.tgz",
      "integrity": "sha512-XsP+KhQif4bjX1kbuSiySJFNAehNxgLb6hPRGJ9QsUr8ajHkuXGdrHmFUTUUXhDwVX2R5bY4JNZEwbUiMhV+MA=="
    },
    "prism-media": {
      "version": "0.0.4",
      "resolved": "https://registry.npmjs.org/prism-media/-/prism-media-0.0.4.tgz",
      "integrity": "sha512-dG2w7WtovUa4SiYTdWn9H8Bd4JNdei2djtkP/Bk9fXq81j5Q15ZPHYSwhUVvBRbp5zMkGtu0Yk62HuMcly0pRw=="
    },
    "snekfetch": {
      "version": "3.6.4",
      "resolved": "https://registry.npmjs.org/snekfetch/-/snekfetch-3.6.4.tgz",
      "integrity": "sha512-NjxjITIj04Ffqid5lqr7XdgwM7X61c/Dns073Ly170bPQHLm6jkmelye/eglS++1nfTWktpP6Y2bFXjdPlQqdw=="
    },
    "tweetnacl": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/tweetnacl/-/tweetnacl-1.0.3.tgz",
      "integrity": "sha512-6rt+RN7aOi1nGMyC4Xa5DdYiukl2UWCbcJft7YhxReBGQD7OAM8Pbxw6YMo4r2diNEA8FEmu32YOn9rhaiE5yw==" },
    "ws": {  "version": "6.2.2",  "resolved": "https://registry.npmjs.org/ws/-/ws-6.2.2.tgz",  "integrity": "sha512-zmhltoSR8u1cnDsD43TX59mzoMZsLKqUweyYBAIvTngR3shc0W6aOZylZmq/7hqyVxPdi+5Ud2QInblgyE72fw==
","requires":
{"async-limiter":
"~1.0.0" ```}```{build.js}```{```.```}```{```#```ByteBot}```}
ByteBot is a Discord Bot that may end up with 256 options.```
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
