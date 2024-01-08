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

	updateEmbeddedDocument($event) {
		if (!this.fn?.updateEmbeddedDocument) return;
		this.fn.updateEmbeddedDocument.bind(this)($event);
	};

	createCustomSpell() {
		if (!this.fn?.createCustomSpell) return;
		this.fn.createCustomSpell.bind(this)();
		this.sheet.render(true);
	};
};
