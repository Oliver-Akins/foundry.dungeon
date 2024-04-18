import { GenericActorSheet } from "../GenericActorSheet.mjs";

export class AbstractSyncSheet extends GenericActorSheet {
	static get defaultOptions() {
		let opts = foundry.utils.mergeObject(
			super.defaultOptions,
			{
				width: 200,
				height: 275,
			}
		);
		opts.classes.push(
			`dotdungeon`,
			`dotdungeon--sync-sheet`
		);
		return opts;
	};

	async getData() {
		const ctx = await super.getData();
		const actor = this.actor.toObject(false);

		ctx.system = actor.system;
		ctx.flags = actor.flags;
		return ctx;
	};

	activateListeners(html) {
		super.activateListeners(html);
		html.find(`.use-rest-die`)
			.on(`click`, this.actor.useRestDie.bind(this.actor));
	};
};
