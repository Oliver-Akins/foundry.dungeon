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
};
