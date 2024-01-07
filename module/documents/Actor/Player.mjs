export class PlayerActor {
	static createCustomSpell() {
		let customUUID = `Spell.Custom.${randomID()}`;
		this.system.spells[customUUID] = {
			name: ``,
			cost: ``,
			description: ``,
		};
	};
};
