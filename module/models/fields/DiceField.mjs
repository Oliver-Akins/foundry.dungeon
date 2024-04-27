import { statDice } from "../../config.mjs";

/**
 * A subclass of DataField that allows ActiveEffects to integrate with dice
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
	};

	_cast(value) { return value };
	_castChangeDelta(delta) { return delta };

	/**
	 * @param {string} value The current value
	 * @param {string} delta The AE value
	 * @param {unknown} model
	 * @param {unknown} changes
	 */
	_applyChangeAdd(value, delta, model, changes) {
		if (value === "") return value;
		delta = parseInt(delta);
		const dieIndex = statDice.findIndex(die => die === value);
		const newIndex = Math.min(Math.max(0, dieIndex + delta), statDice.length - 1);
		value = statDice[newIndex];
		return value;
	};

	/**
	 * @param {string} value The current value
	 * @param {string} delta The AE value
	 * @param {unknown} model
	 * @param {unknown} changes
	 */
	_applyChangeMultiply(value, delta, model, changes) {
		console.warn(`.dungeon | Cannot apply Multiply ActiveEffects to DiceFields. Not changing value.`);
		return value;
	};

	/**
	 * @param {string} value The current value
	 * @param {string} delta The AE value
	 * @param {unknown} model
	 * @param {unknown} changes
	 */
	_applyChangeOverride(value, delta, model, changes) {
		return delta;
	};

	/**
	 * @param {string} value The current value
	 * @param {string} delta The AE value
	 * @param {unknown} model
	 * @param {unknown} changes
	 */
	_applyChangeUpgrade(value, delta, model, changes) {
		if (value === "") return value;
		const currentIndex = statDice.findIndex(die => die === value);
		const upgradedIndex = statDice.findIndex(die => die === delta);
		return statDice[Math.max(currentIndex, upgradedIndex)];
	};

	/**
	 * @param {string} value The current value
	 * @param {string} delta The AE value
	 * @param {unknown} model
	 * @param {unknown} changes
	 */
	_applyChangeDowngrade(value, delta, model, changes) {
		if (value === "") return value;
		const currentIndex = statDice.findIndex(die => die === value);
		const upgradedIndex = statDice.findIndex(die => die === delta);
		return statDice[Math.min(currentIndex, upgradedIndex)];
	};
};
