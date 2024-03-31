import { GenericItemSheet } from "./GenericItemSheet.mjs";

export class UntypedItemSheet extends GenericItemSheet {
	static get defaultOptions() {
		let opts = mergeObject(
			super.defaultOptions,
			{
				template: `systems/dotdungeon/templates/items/untyped/v2/index.hbs`,
				width: 300,
				height: 340,
				tabs: [
					{
						group: `page`,
						navSelector: `nav.page`,
						contentSelector: `.page-content`,
						initial: `general`,
					},
				],
			}
		);
		opts.classes.push(`dotdungeon`, `style-v3`);
		return opts;
	};

	async getData() {
		const ctx = await super.getData();

		ctx.computed = {
			showSettingsTab: ctx.isGM || this.item.isOwned,
		};

		return ctx;
	};
};
