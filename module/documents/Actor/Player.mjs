export class PlayerActor {
	static createCustomSpell() {
		let customUUID = `Spell.Custom.${randomID()}`;
		this.system.spells[customUUID] = {
			name: ``,
			cost: ``,
			description: ``,
		};
	};

	static async updateEmbeddedDocument($event) {
		let data = $event.target.dataset;
		let item = await fromUuid(data.embeddedId);
		item?.update({ [data.embeddedUpdate]: $event.target.value });
	};
};
