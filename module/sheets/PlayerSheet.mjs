import { GenericActorSheet } from "./GenericActorSheet.mjs";

export class PlayerSheet extends GenericActorSheet {
	static get defaultOptions() {
		let opts = mergeObject(
			super.defaultOptions,
			{
				template: `systems/dotdungeon/templates/actors/char-sheet-mvp/sheet.hbs`
			}
		);
		opts.classes.push(`dotdungeon`);
		return opts;
	};

	activateListeners(html) {
		super.activateListeners(html);

		if (this.document.isEmbedded) return;
		if (!this.isEditable) return;
		console.debug(`.dungeon | Adding event listeners for Actor: ${this.id}`);
	};

	async getData() {
		const ctx = await super.getData();
		const actor = this.actor.toObject(false);

		ctx.system = actor.system;
		ctx.flags = actor.flags;
		ctx.items = this.actor.itemTypes;

		ctx.computed = {
			canChangeGroup: ctx.settings.playersCanChangeGroup || ctx.isGM,
			canAddAspect: ctx.items.aspect.length == 0,
		};

		console.log(ctx)
		return ctx;
	};
};