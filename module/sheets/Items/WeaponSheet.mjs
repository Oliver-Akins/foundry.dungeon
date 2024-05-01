import { GenericContextMenu } from "../../utils/GenericContextMenu.mjs";
import { DialogManager } from "../../utils/DialogManager.mjs";
import { GenericItemSheet } from "./GenericItemSheet.mjs";
import { localizer } from "../../utils/localizer.mjs";

export class WeaponSheet extends GenericItemSheet {
	static get defaultOptions() {
		let opts = foundry.utils.mergeObject(
			super.defaultOptions,
			{
				template: `systems/dotdungeon/templates/items/weapon/v1/index.hbs`,
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
		console.debug(`.dungeon | Adding event listeners for Weapon Item: ${this.item.id}`);

		html.find(`.create-ae`).on(`click`, async () => {
			await this.item.createEmbeddedDocuments(
				`ActiveEffect`,
				[{name: localizer(`dotdungeon.default.name`, { document: `ActiveEffect`, type: `base` })}],
				{ renderSheet: true }
			);
		});

		new GenericContextMenu(html, `.effect.panel`, [
			{
				name: localizer(`dotdungeon.common.edit`),
				callback: async (html) => {
					(await fromUuid(html.closest(`.effect`)[0].dataset.embeddedId))?.sheet.render(true);
				},
			},
			{
				name: localizer(`dotdungeon.common.delete`),
				callback: async (html) => {
					const target = html.closest(`.effect`)[0];
					const data = target.dataset;
					const id = data.embeddedId;
					const doc = await fromUuid(id);
					DialogManager.createOrFocus(
						`${doc.uuid}-delete`,
						{
							title: localizer(`dotdungeon.delete.ActiveEffect.title`, doc),
							content: localizer(`dotdungeon.delete.ActiveEffect.content`, doc),
							buttons: {
								yes: {
									label: localizer(`Yes`),
									callback() {
										doc.delete();
									},
								},
								no: {
									label: localizer(`No`),
								}
							}
						}
					);
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
