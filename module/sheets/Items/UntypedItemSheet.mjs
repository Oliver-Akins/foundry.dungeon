import { GenericItemSheet } from "./GenericItemSheet.mjs";

export class UntypedItemSheet extends GenericItemSheet {
	static get defaultOptions() {
		let opts = mergeObject(
			super.defaultOptions,
			{
				template: `systems/dotdungeon/templates/items/custom.hbs`,
				width: 280,
				height: 340,
			}
		);
		opts.classes.push(`dotdungeon`);
		return opts;
	};

	async getData() {
		const ctx = await super.getData();
		return ctx;
	};
};