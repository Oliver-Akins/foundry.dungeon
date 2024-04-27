export class DotDungeonActiveEffect extends ActiveEffect {

	// Invert the logic of the disabled property so it's easier to modify via
	// embedded controls
	get enabled() { return !this.disabled };
	set enabled(newValue) { this.disabled = !newValue };
};
