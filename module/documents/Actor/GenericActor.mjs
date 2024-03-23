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

	async preItemEmbed(data) {
		let embedded = this.itemTypes[data.type].find(i => {
			return i.name === data.name
		});
		if (embedded) {
			await embedded.update({"system.quantity": embedded.system.quantity + 1});
			ui.notifications.info(
				game.i18n.format(
					`dotdungeon.notification.info.increased-item-quantity`,
					{ name: embedded.name, quantity: embedded.system.quantity }
				),
				{ console: false }
			);
			return false;
		};
		return true;
	};
};
