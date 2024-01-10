export class PlayerActor {
	static async genericEmbeddedUpdate($event) {
		let data = $event.target.dataset;
		let item = await fromUuid(data.embeddedId);
		item?.update({ [data.embeddedUpdate]: $event.target.value });
	};

	static async genericEmbeddedDelete($event) {
		let data = $event.target.dataset;
		let itemID = data.embeddedId;
		if (!itemID) {
			// TODO: Throw a notification here
			return;
		};
		// TODO: Ask for confirmation before deleting
	};

	static createCustomSpell() {
		this.createEmbeddedDocuments(
			"Item",
			[{ type: `spell`, name: `New Spell` }]
		);
	};
};
