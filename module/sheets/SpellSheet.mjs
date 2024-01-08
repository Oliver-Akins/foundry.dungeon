import { GenericItemSheet } from "./GenericItemSheet.mjs";

export class SpellSheet extends GenericItemSheet {
	static get defaultOptions() {
		let opts = mergeObject(
			super.defaultOptions,
			{
				template: `systems/dotdungeon/templates/items/spell.hbs`,
				width: 280,
				height: 340,
			}
		);
		opts.classes.push(`dotdungeon`);
		return opts;
	};

	activateListeners(html) {
		super.activateListeners(html);

		if (this.document.isEmbedded) return;
		if (!this.isEditable) return;
		console.debug(`.dungeon | Adding event listeners for Generic Item: ${this.id}`);
	};

	async getData() {
		const ctx = {};
		const item = this.item.toObject(false);

		ctx.name = super.name;
		ctx.item = item;
		ctx.system = item.system;
		ctx.flags = item.flags;

		return ctx;
	};
};
