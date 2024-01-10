export class PlayerActor {
	static createCustomSpell() {
		this.createEmbeddedDocuments(
			"Item",
			[{ type: `spell`, name: `New Spell` }]
		);
	};

	static async updateEmbeddedDocument($event) {
		let data = $event.target.dataset;
		let item = await fromUuid(data.embeddedId);
		item?.update({ [data.embeddedUpdate]: $event.target.value });
	};
};
