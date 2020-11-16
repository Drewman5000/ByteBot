module.exports = {
	name: "coins",
	description: "Flips a random number of coins and give the results.",
	execute(msg, args) {
		const coinFlip = (min, max) => {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		};

		const factorialize = (num) => {
			if (num === 0 || num === 1)
				return 1;
			for (var i = num - 1; i >= 1; i--) {
				num *= i;
			}
			return num;
		}

		let reply = "";
		let rand = coinFlip(1, 20);
		let result = coinFlip(0, 1);
		let headsCount = 0;
		let tailsCount = 0;

		if (rand === 1) {
			reply += "You flipped a coin:  \n"
			reply += result ? "Heads" : "Tails";
		} else {
			reply += "You flipped " + rand + " coins!\n";
			for (var i = 0; i < rand; i++) {
				if (coinFlip(0,1)) {
					reply += "\n\t Heads, ";
					headsCount++;
				} else {
					reply += "\n\t Tails, ";
					tailsCount++;
			}
			}
		}
		let totalEvents = Math.pow(2, rand);
		let success = (factorialize(rand))/((factorialize(headsCount))*(factorialize(rand-headsCount)));

		reply += "\n The odds of " + headsCount + " Heads in " + rand + " coin flips is " +
		success + " out of " + totalEvents + "!";
		msg.channel.send(reply);
	}
};