const diceOptions = [
	`d4`,
	`d6`,
	`d8`,
	`d10`,
	`d12`,
	`d20`
]

export default Dialog({
	title: `Die Selector`,
	content: `<p>Select a Dice</p>`,
	buttons: {
		d4: {
			label: "d4",
			callback() {
				console.log(`Selected a d4`)
			}
		},
		d6: {
			label: "d6",
			callback() {
				console.log(`Selected a d6`)
			}
		}
	}
})