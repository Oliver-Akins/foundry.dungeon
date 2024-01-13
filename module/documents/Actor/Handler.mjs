import PlayerActor from "./Player.mjs";

export class ActorHandler extends Actor {
	actorTypes = {
		player: PlayerActor,
	};

	constructor(data, ctx) {
		super(data, ctx);
	};

	/** @type {class|undefined} */
	get fn() {
		return this.actorTypes[this.type];
	};

	async openEmbeddedSheet($event) {
		if (this.fn?.openEmbeddedSheet) {
			this.fn.openEmbeddedSheet.bind(this)($event);
		} else {
			const data = $event.target.dataset;
			let item = await fromUuid(data.embeddedEdit);
			item?.sheet.render(true);
		};
	};

	async genericEmbeddedUpdate($event) {
		if (!this.fn?.genericEmbeddedUpdate) return;
		this.fn.genericEmbeddedUpdate.bind(this)($event);
	};

	async genericEmbeddedDelete($event) {
		if (!this.fn?.genericEmbeddedDelete) return;
		this.fn.genericEmbeddedDelete.bind(this)($event);
	};

	async genericEmbeddedCreate($event) {
		const data = $event.currentTarget.dataset;
		if (!this.fn?.[`createCustom${data.embeddedCreate}`]) return;
		this.fn?.[`createCustom${data.embeddedCreate}`].bind(this)($event);
	};
};
