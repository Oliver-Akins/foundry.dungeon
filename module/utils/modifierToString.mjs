/**
 * Takes in an integer and converts it into a string format that can be used in
 * roll formulas or for displaying to the user.
 *
 * @param {number} mod The modifier to stringify
 * @param {object} opts
 * @param {boolean} opts.spaces Puts spaces on either side of the operand
 * @returns {string}
 */
export function modifierToString(mod, opts = {}) {
	if (mod == 0) return ``;

	let value = [``, `+`, mod]
	if (mod < 0) {
		value = [``, `-`, Math.abs(mod)]
	};
	return value.join(opts.spaces ? ` ` : ``);
};
