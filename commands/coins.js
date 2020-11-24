module.exports = {
	name: 'coins',
	cooldown: 4,
	usage: '[number of coins]',
	description: 'Flips a random number of coins and give the results. Use optional number as an argument.',
	execute(msg, args) {
		let reply = '';
		const coinFlip = (min, max) => {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		};
		const rand = coinFlip(1, 20);
		const commandIndex = args.indexOf(args.find((arg) => { return arg === '!coins';}));
		let coins = parseInt(args[commandIndex + 1]) ? parseInt(args[commandIndex + 1]) : false;
		if (!coins) { reply += 'You didn\'t say how many coins, so I picked ' + rand + ' coins for you!\n';}

		const factorialize = (num) => {
			if (num === 0 || num === 1) return 1;
			for (let i = num - 1; i >= 1; i--) {
				num *= i;
			}
			return num;
		};
		coins = coins ? coins : rand;
		const result = coinFlip(0, 1);
		let headsCount = 0;
		if (coins === 1) {
			reply += 'You flipped a coin:  \n';
			reply += result ? 'Heads' : 'Tails';
		}
		else {
			reply += 'You flipped ' + coins + ' coins!\n';
			for (let i = 0; i < coins; i++) {
				if (coinFlip(0, 1)) {
					reply += '\n\t Heads, ';
					headsCount++;
				}
				else {
					reply += '\n\t Tails, ';
				}
			}
		}
		const totalEvents = Math.pow(2, coins);
		const success = (factorialize(coins)) / ((factorialize(headsCount)) * (factorialize(coins - headsCount)));

		reply += '\n The odds of ' + headsCount + ' Heads in ' + coins + ' coin flips is ' +
		success + ' out of ' + totalEvents + '!';
		msg.channel.send(reply);
	},
};