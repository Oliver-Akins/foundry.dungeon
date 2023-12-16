export class PlayerSheet extends ActorSheet {
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

		// Modal openings
		// html.find(`button.stat-prompt`).on("click", () => {});
	};

	getData() {
		const ctx = super.getData();
		const actor = this.actor.toObject(false);

		ctx.system = actor.system;
		ctx.flags = actor.flags;

		console.groupCollapsed(`PlayerSheet.getData`);
		console.log(`ctx`, ctx);
		console.log(`actor`, actor);
		console.groupEnd();
		return ctx;
	};
};