export class PlayerActor {
	static createCustomSpell() {};

	static async updateEmbeddedDocument($event) {
		let data = $event.target.dataset;
		let item = await fromUuid(data.embeddedId);
		item?.update({ [data.embeddedUpdate]: $event.target.value });
	};
};
