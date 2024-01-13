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

		if (!this.isEditable) return;
		console.debug(`.dungeon | Adding event listeners for Spell Item: ${this.id}`);
	};

	async getData() {
		const ctx = await super.getData();

		ctx.item = this.item;
		ctx.system = this.item.system;
		ctx.flags = this.item.flags;
		console.log(ctx)
		return ctx;
	};
};
