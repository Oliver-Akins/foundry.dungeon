export class PlayerActor {
	/** @this {Actor} */
	static async genericEmbeddedUpdate($event) {
		let data = $event.delegateTarget.dataset;
		let item = await fromUuid(data.embeddedId);
		item?.update({ [data.embeddedUpdate]: $event.target.value });
		this.sheet.render();
	};

	/** @this {Actor} */
	static async genericEmbeddedDelete($event) {
		let data = $event.delegateTarget.dataset;
		let item = await fromUuid(data.embeddedId);

		if (!item) {
			ui.notifications.error(
				`dotdungeon.notification.error.item-not-found`,
				{ console: false }
			);
			return;
		};

		Dialog.confirm({
			title: game.i18n.format(
				`dotdungeon.dialogs.${item.type}.delete.title`,
				item
			),
			content: game.i18n.format(
				`dotdungeon.dialogs.${item.type}.delete.content`,
				item
			),
			yes: () => {
				item.delete();
			},
			defaultYes: false,
		});
	};

	/** @this {Actor} */
	static createCustomSpell() {
		this.createEmbeddedDocuments(
			"Item",
			[{ type: `spell`, name: `New Spell` }]
		);
		this.sheet.render();
	};
};
