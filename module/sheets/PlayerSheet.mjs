import { GenericSheet } from "./GenericSheet.mjs";

export class PlayerSheet extends GenericSheet {
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

		// html.find(`input.sync__input`).on("blur", ($e) => {});
	};

	getData() {
		const ctx = super.getData();
		const actor = this.actor.toObject(false);

		ctx.system = actor.system;
		ctx.flags = actor.flags;

		ctx.computed = {
			syncTotal: 0
		};

		console.groupCollapsed(`PlayerSheet.getData`);
		console.log(`ctx`, ctx);
		console.log(`actor`, actor);
		console.groupEnd();
		return ctx;
	};
};