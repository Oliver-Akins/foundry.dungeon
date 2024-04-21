import { GenericContextMenu } from "../../utils/GenericContextMenu.mjs";
import { GenericItemSheet } from "./GenericItemSheet.mjs";
import { localizer } from "../../utils/localizer.mjs";

export class UntypedItemSheet extends GenericItemSheet {
	static get defaultOptions() {
		let opts = foundry.utils.mergeObject(
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

		new GenericContextMenu(html, `.photo.panel`, [
			{
				name: localizer(`dotdungeon.common.view-larger`),
				callback: () => {
					(new ImagePopout(this.item.img)).render(true);
				},
			},
			{
				name: localizer(`dotdungeon.common.edit`),
				condition: () => this.isEditable,
				callback: () => {
					const fp = new FilePicker({
						callback: (path) => {
							this.item.update({"img": path});
						},
					});
					fp.render(true);
				},
			},
			{
				name: localizer(`dotdungeon.common.reset`),
				condition: () => this.isEditable,
				callback: () => {
					console.log(`.dungeon | Reset Item Image`)
				},
			}
		]);

		if (!this.isEditable) return;
		console.debug(`.dungeon | Adding event listeners for Untyped Item: ${this.item.id}`);

		new GenericContextMenu(html, `.effect.panel`, [
			{
				name: localizer(`dotdungeon.common.edit`),
				callback: async (html) => {
					(await fromUuid(html.closest(`.effect`)[0].dataset.embeddedId))?.sheet.render(true);
				},
			},
			{
				name: localizer(`dotdungeon.common.delete`),
				callback: async () => {
					(await fromUuid(html.closest(`.effect`)[0].dataset.embeddedId))?.delete(true);
				},
			}
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
