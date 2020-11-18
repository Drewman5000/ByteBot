module.exports = {
	name: "caesar",
	description: "Cipher your message à la Cæsar.",
	execute(msg, args, list, prefix, message) {

		let period = 7;
		let displayPeriod = 5;
		let rotation = 3;
		let cipherKey = ["A","B","C","D","E","F","G","H","I","J","K","L","M",
			"N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

		let plainText = message;
		let middleText = 'error before middle text';
		let cipherText = [];
		let displayText = 'error before display text';

		// 1. Manipulate message args
			// a. strip command and params
			// take msg and match against command args and non-letter characters.
			// b. strip non-text characters
			// c. toUpperCase()
		const takeOut = (plainText) => { 
			let takeOutCommands = new RegExp("\\b(!caesar)\\b", "gi");
	        plainText = plainText.replace(takeOutCommands, "");
	       	plainText = plainText.replace(/\W/ig, '').toUpperCase();

	       	return plainText;
	  	}
	  	middleText = takeOut(plainText);
			
		// 2. transpose by rotation via cipherKey
		const encode = (middleText) => {
			
			for (c in middleText) {
				
				let cipherIndex = cipherKey.indexOf(middleText[c]);
				let newIndex = cipherIndex + rotation;
				let rotIndex = newIndex - 26;
				
				if (cipherIndex === -1) {
					cipherText[c] = middleText[c];
				} else {
					if ((newIndex) > 25) {
						cipherText[c] = cipherKey[rotIndex];
					} else {
					cipherText[c] = cipherKey[newIndex];
					}
				} 
			}
			return cipherText;
		};

		cipherText = encode(takeOut(plainText)).join('');

		let dividend = cipherText.length;
		let len = (dividend / displayPeriod);
		let divisible = dividend % displayPeriod;
		const cycleLength = () => !divisible ? len : len + 1;
		// 3. print cipher text to reply variable with displayPeriod.
		const displayReady = () => {
			displayText = '';
			for (i=0; i <= cycleLength(); i++) {
				displayText += cipherText.substring(i*5, (i+1)*5 > dividend ? dividend : (i+1)*5) + " ";
			}
		}

		displayReady();
		let reply = displayText;

		msg.channel.send(reply);
	},
};