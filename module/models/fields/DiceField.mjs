import { statDice } from "../../config.mjs";

/**
 * A subclass of StringField that allows ActiveEffects to integrate with dice
 * values and increase/decrease the value step-wise according to the dice ladder.
 */
export class DiceField extends foundry.data.fields.DataField {
	static get _defaults() {
		return foundry.utils.mergeObject(super._defaults, {
			trim: true,
			blank: true,
			initial: ``,
			choices: [``, ...statDice],
		});
	};

	constructor(options = {}, context = {}) {
		super(options, context);

		// v- because for some reason Foundry doesn't respect the _defaults getter
		this.blank = true;
		console.log(this.choices)
	};

	applyChange(...args) {
		console.log(`DiceField.applyChange`, args);
		return super.applyChange(...args)
	}

	_cast(value) {
		return String(value);
	}

	_castChangeDelta(delta) {
		console.log(`DiceField._castChangeDelta(${delta})`)
		return parseInt(delta) ?? 0;
	};

	/** @inheritdoc */
	_applyChangeAdd(value, delta, model, change) {
		console.warn(`Cannot apply Add ActiveEffects to DiceFields. Not changing value.`);
		return value;
	};

	_applyChangeMultiply(value, delta, model, change) {
		console.warn(`Cannot apply Multiply ActiveEffects to DiceFields. Not changing value.`);
		return value;
	};

	_applyChangeOverride(value, delta, model, change) {
		return delta;
	};

	_applyChangeUpgrade(value, delta, model, change) {
		console.log(`.dungeon | Pre: value=${value}; delta=${delta}`);
		if (value === "") return value;
		const dieIndex = statDice.findIndex(value);
		const newIndex = Math.min(Math.max(0, dieIndex - delta), statDice.length - 1);
		value = statDice[newIndex];
		console.log(`.dungeon | Post: value=${value}; delta=${delta}`);
		return value;
	};

	_applyChangeDowngrade(value, delta, model, change) {
		console.log(`.dungeon | Pre: value=${value}; delta=${delta}`);
		if (value === "") return value;
		const dieIndex = statDice.findIndex(value);
		const newIndex = Math.min(Math.max(0, dieIndex + delta), statDice.length - 1);
		value = statDice[newIndex];
		console.log(`.dungeon | Post: value=${value}; delta=${delta}`);
		return value
	};
};
