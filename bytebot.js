require("dotenv").config();
const { prefix, author } = require("./config.json");
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
             if (command === 'help') {
               let list = bytebotCommands;
               bytebot.commands.get(command).execute(msg, list, prefix);
             } else {
              bytebot.commands.get(command).execute(msg, args);
              }
          } catch (error) {
            console.error(error);
            msg.reply('There was an error trying to execute that command!');
          };
        }
      });
    };
  }
  // const args = msg.content.split(/\s+/);
  // for (el of args) {
  //   for (c of el) {
  //     if (c.toUpperCase() != c.toLowerCase() || c.codePointAt(0) > 127) {
  //       c.toLowerCase;
  //     }
  //   }
  // }
  // commandFilter = (arr, query) => {
  //   return arr.filter(function (el) {
  //     return el.toLowerCase().indexOf(query.toLowerCase()) !== -1;
  //   });
  // };
  // let commands = commandFilter(args, prefix);

  // for (el of commands) {
  //   if (el.substring(0, 1) == prefix) {
  //     const command = el.substring(1);
  //     console.info(`Called command: ${command}`);

  //     if (!bytebot.commands.has(command)) return;

  //     try {
  //       bytebot.commands.get(command).execute(msg, args);
  //     } catch (error) {
  //       console.error(error);
  //       msg.reply("There was an error trying to execute that command!");
  //     }
  //   }
  // }
});
