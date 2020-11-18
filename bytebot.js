require("dotenv").config();
const { prefix, author, version } = require("./config.json");
const Discord = require("discord.js");
const bytebot = new Discord.Client();
bytebot.commands = new Discord.Collection();
const bytebotCommands = require("./commands");

Object.keys(bytebotCommands).map((key) => {
  bytebot.commands.set(bytebotCommands[key].name, bytebotCommands[key]);
});

const TOKEN = process.env.TOKEN;

bytebot.login(TOKEN);

bytebot.on("ready", () => {
  console.info(`Logged in as ${bytebot.user.tag}!`);
});

bytebot.on("message", (msg) => {
  const args = msg.content.split(/\s+/);
  const message = msg.content;
  let list = bytebotCommands;
  // const regex = /(!)(\b(bit|coin)\b)/ig;
  
  for (item in bytebotCommands) {
    let commandTest = bytebotCommands[item].name.toLowerCase();
    let regexp = new RegExp("("+prefix+")(\\b("+commandTest+")\\b)","gi");

    let m;

    while((m = regexp.exec(message)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regexp.lastIndex) {
        regexp.lastIndex++;
      }
      // The result can be accessed through the `m`-variable.
      m.forEach((match, groupIndex) => {
        if (groupIndex === 2) {
          const command = match.toLowerCase();
          console.info(`Called command: ${command}`);

          if (!bytebot.commands.has(command)) return;

          try {
              bytebot.commands.get(command).execute(msg, args, list, prefix, message, version);
          } catch (error) {
            console.error(error);
            msg.reply('There was an error trying to execute that command!');
          };
        }
      });
    };
  }
});
