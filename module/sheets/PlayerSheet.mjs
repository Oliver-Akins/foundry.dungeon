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

		/*
		Toggles the expanded state for the detail elements in the sheet.
		*/
		html.find(`summary`).on(`click`, ($e) => {

		});
	};

	#syncValue() {
		let delta = 0;
		for (const actor of game.actors) {
			delta += actor.system.syncDelta ?? 0;
		};
		return 100 + delta;
	};

	getData() {
		const ctx = super.getData();
		const actor = this.actor.toObject(false);

		ctx.system = actor.system;
		ctx.flags = actor.flags;

		ctx.computed = {
			syncTotal: this.#syncValue(),
			canChangeGroup: ctx.settings.playersCanChangeGroup || ctx.isGM,
		};

		ctx.meta.idp = this.actor.uuid;

		console.groupCollapsed(`PlayerSheet.getData`);
		console.log(`ctx`, ctx);
		console.log(`actor`, actor);
		console.groupEnd();
		return ctx;
	};
};