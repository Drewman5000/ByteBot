"build.ninja.bytebot.js-build.ninja"/#"
"output_log.txt"`Custo-mathod-e.js
push"@adrianhajdin/Customizer.jsx~#".$_-0/build.Custo-mathod-e.js
push"@adrianhajdin/Customizer.jsxCusto-mathod-e.js
push"@adrianhajdin/Customizer.jsx~#".$_-0/build.Custo-mathod-e.js
push"@adrianhajdin/Customizer.jsxAll 
gists-5-|
| __--..//Forked_3
| 1 file
| 0 forks
| 1 comment
| 0 stars
lostleolotus / Method-e.js Secret
Last active 1 minute ago
CusTo-Mathodizer_json-java.js
lostleolotus/Custo-mathod-e.js
push"@adrianhajdin/Customizer.jsx
# "Code Revisions
"Revisions
".$_-0/build_method-e"
"Build and Deploy an "
#"AI-Pow-e_medthod.js"
#"Custo-mathod-e.js/CusTo-Mathodizer_json-java.js"
".$_-*/button_className""👇👆"=("👇-down)(👆👆-L")'methodod-e".js"
 2 files
 0 forks
 0 comments
 0 stars
lostleolotus / Custo-mathod-e.js
Last active 16 minutes ago — forked from adrianhajdin/Customizer.jsx
Build and Deploy an AI-Powered 3D Website Using React | 2023 Three JS Course Tutorial for Beginners
".$_-*/button_className""👇👆"=("👇-down)(👆👆-L")'methodod-e".js"
`|||•]
".$_-0/"Download button"` */"}
            <"button class"Name='"download-btn"' onClick={"download"CanvasTo"Image}">
              <".img"
                src="{download}"
                alt="'download_image'"
                "className="'w-3/5 h-3/5 object-contain'"
              />
            </"button">
 1 file
 0 forks
 0 comments
 0 stars
lostleolotus / ua.json_js_java_js.js
Last active 2 weeks ago — forked from fijimunkii/ua.json
User_Agents.js
"ua.json"
".$_-0/"https_--gist.githubusercontent.com/lostleolotus/raw/ua.json_js_java_js.js"
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:90.0) Gecko/20100101 Firefox/90.0",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.164 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Sa
 1 file
 0 forks
 1 comment
 0 stars
lostleolotus / output_log.txt
Last active 2 weeks ago — forked from HugsLibRecordKeeper/output_log.txt
Rimworld output log published using HugsLib
 Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36/lostleolotus/README.md

README.md

README

build.ninja

@lostleolotus lostleolotus revised this gist on Nov 1, 2021.

 3 files
 0 forks
 0 comments
 0 stars
lostleolotus / README.md
Last active 2 weeks ago
lostleolotus
<[build.ninja.yml.md]>

README
build.ninja
"output_log.txt"Custo-mathod-e.js
require('dotenv').config(".$_-0_json/"
                         .js")";"{"
"const fs" 
        = "require"('fs')";"".$_-0/"
"const {" 
        prefix "} = 
                require(
                ".$_-0/config.json');
const 
"Discord = require('discord.js');
"const bytebot" = new Discord".Client"(".$_-0/");".$_-0/
"bytebot.commands" = new "Discord.Collection(".$_-0/");
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
