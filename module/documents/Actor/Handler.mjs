import { PlayerActor } from "./Player.mjs";

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
		console.log(`openEmbeddedSheet`)
		if (this.fn?.openEmbeddedSheet) {
			this.fn.openEmbeddedSheet.bind(this)($event);
		} else {
			const data = $event.currentTarget.dataset;
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

	async createCustomSpell() {
		if (!this.fn?.createCustomSpell) return;
		this.fn.createCustomSpell.bind(this)();
		this.sheet.render(true);
	};
};
