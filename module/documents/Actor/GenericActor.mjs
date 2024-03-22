import { DotDungeonItem } from "../Item/GenericItem.mjs";

export class DotDungeonActor extends Actor {
	async createEmbeddedItem(defaults, opts = {}) {
		let items = await this.createEmbeddedDocuments(`Item`, defaults);
		if (items.length == 0) {
			throw new Error(`Failed to create any items`);
		};
		this.sheet.render();
		if (
			game.settings.get(`dotdungeon`, `openEmbeddedOnCreate`)
			&& !opts.overrideSheetOpen
		) {
			for (const item of items) {
				item.sheet.render(true);
			};
		};
	};

	/** @param {DotDungeonItem} item */
	async preItemEmbed(item) {
		console.log(`preEmbed`, item._source._id);
		let type = item.type[0].toUpperCase() + item.type.slice(1);
		if (this[`pre${type}Embed`]) {
			return await this[`pre${type}Embed`](item);
		};
		let embedded = this.itemTypes[item.type].find(i => i._source._id === item._source._id);
		if (embedded) {
			await embedded.update({"system.quantity": embedded.system.quantity + 1});
			ui.notifications.info(
				game.i18n.format(
					`dotdungeon.notification.info.increased-item-quantity`,
					{ name: inventoryItem.name }
				),
				{ console: false }
			);
			return false;
		};
		return true;
	};
};
