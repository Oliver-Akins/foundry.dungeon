import { GenericContextMenu } from "../../utils/GenericContextMenu.mjs";
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

	activateListeners(html) {
		super.activateListeners(html);

		if (!this.isEditable) return;
		console.debug(`.dungeon | Adding event listeners for Untyped Item: ${this.item.id}`);

		new GenericContextMenu(html, `.photo.panel`, [
			{
				name: `View Larger`,
				callback: (html) => {
					console.log(`.dungeon | View Larger`);
				},
			},
			{
				name: `Change Photo`,
				callback: (html) => {
					console.log(`.dungeon | Change Photo`);
				},
			},
		]);
	};

	async getData() {
		const ctx = await super.getData();

		ctx.meta.showSettingsTab = ctx.isGM || this.item.isOwned;
		ctx.meta.isEmbedded = this.item.isOwned;
		ctx.meta.isEditable = this.isEditable;

		return ctx;
	};
};
