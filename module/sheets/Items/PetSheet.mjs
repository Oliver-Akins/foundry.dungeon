import { GenericItemSheet } from "./GenericItemSheet.mjs";

export class PetSheet extends GenericItemSheet {
	static get defaultOptions() {
		let opts = foundry.utils.mergeObject(
			super.defaultOptions,
			{
				template: `systems/dotdungeon/templates/items/pet.hbs`,
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
		console.debug(`.dungeon | Adding event listeners for Pet Item: ${this.id}`);
	};

	async getData() {
		const ctx = await super.getData();
		return ctx;
	};
};
