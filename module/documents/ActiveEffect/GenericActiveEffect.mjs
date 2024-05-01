import { invalidActiveEffectTargets } from "../../config.mjs";

export class DotDungeonActiveEffect extends ActiveEffect {

	// Invert the logic of the disabled property so it's easier to modify via
	// embedded controls
	get enabled() { return !this.disabled };
	set enabled(newValue) { this.disabled = !newValue };

	apply(object, change) {
		if (invalidActiveEffectTargets.has(change.key)) return;

		change.value = change.value.replace(
			/@(?<key>[\w\.]+)/gi,
			(...args) => {
				const key = args[1];
				if (foundry.utils.hasProperty(object, key)) {
					return foundry.utils.getProperty(object, key)
				};
				return args[0];
			}
		)
		return super.apply(object, change);
	}
};
