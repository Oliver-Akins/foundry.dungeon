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

		/*
		Toggles the expanded state for the detail elements in the sheet.
		*/
		html.find(`summary`).on(`click`, ($e) => {
			console.debug(`.dungeon | summary[data-collapse-id="${$e.target.dataset.collapseId}"] click event`);
			/*
			This seeming inversion of logic is due to the fact that this handler
			gets called before the element is updated to include/reflect the
			change, so if the parentNode doesn't actually have it, then we're
			opening it and vice-versa.
			*/
			if (!$e.target.parentNode.open) {
				this._expanded.add($e.target.dataset.collapseId);
			} else {
				this._expanded.delete($e.target.dataset.collapseId);
			};
		});
	};

	_expanded = new Set();

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

		ctx.meta = {
			expanded: this._expanded,
		};

		console.groupCollapsed(`PlayerSheet.getData`);
		console.log(`ctx`, ctx);
		console.log(`actor`, actor);
		console.groupEnd();
		return ctx;
	};
};