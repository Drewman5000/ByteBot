module.exports = {
	name: 'caesar',
	cooldown: 5,
	description: 'Cipher your message à la Cæsar.',
	execute(msg, args, list) {

		let period = 7;
		let displayPeriod = 5;
		let rotation = 3;
		const cipherKey = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
			'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

		// 1. Manipulate message args
		// a. strip command and params
		// take msg and match against command args and non-letter characters.
		// b. strip non-text characters
		// c. toUpperCase()
		const takeOut = (plainText) => {
			const takeOutCommands = new RegExp('\\b(!caesar)\\b', 'gi');
			let mT = plainText.replace(takeOutCommands, '');
			mT = mT.replace(/\W/ig, '').toUpperCase();

			return mT;
		};
		// 2. transpose by rotation via cipherKey
		const encode = (middleText) => {
			const cipherText = [];

			for (const c in middleText) {

				const cipherIndex = cipherKey.indexOf(middleText[c]);
				const newIndex = cipherIndex + rotation;
				const rotIndex = newIndex - 26;

				if (cipherIndex === -1) {
					cipherText.push(middleText[c]);
				}
				else if ((newIndex) > 25) {
					cipherText.push(cipherKey[rotIndex]);
				}
				else {
					cipherText.push(cipherKey[newIndex]);
				}
			}
			return cipherText.join('').toString();
		};

		const readyCipherText = encode(takeOut(msg.content));

		const dividend = readyCipherText.length;
		const len = (dividend / displayPeriod);
		const divisible = dividend % displayPeriod;
		const cycleLength = () => !divisible ? len : len + 1;
		// 3. print cipher text to reply variable with displayPeriod.
		const displayReady = (cipherInput) => {
			let displayText = '';
			for (let i = 0; i <= cycleLength(); i++) {
				displayText += cipherInput.substring(i * 5, (i + 1) * 5 > dividend ? dividend : (i + 1) * 5) + ' ';
			}
			return displayText;
		};

		const reply = displayReady(readyCipherText);

		msg.channel.send(reply);
	},
};