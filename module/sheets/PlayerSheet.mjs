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

		// html.find(`input.sync__input`).on("blur", ($e) => {
		// 	console.debug(`.dungeon | input.sync__input blur event`);

		// 	let value = parseInt($e.target.value);
		// 	if (!value) {
		// 		ui.notifications.error(
		// 			`dotdungeon.notification.error.invalid-integer`,
		// 			{ localize: true }
		// 		);
		// 		return;
		// 	};
		// 	let delta = value - this.#syncValue();
		// 	this.actor.system.syncDelta += delta;
		// 	for (const actor of game.actors) {
		// 		if (actor._sheet)
		// 	}
		// 	game.socket.emit(`system.dotdungeon`, {
		// 		type: "reload",

		// 	})
		// });
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
			canChangeGroup: ctx.settings.playersCanChangeGroup,
		};

		console.groupCollapsed(`PlayerSheet.getData`);
		console.log(`ctx`, ctx);
		console.log(`actor`, actor);
		console.groupEnd();
		return ctx;
	};
};