import { localizer } from "../../utils/localizer.mjs";

export class DotDungeonActor extends Actor {
	/** @type {any} */
	system;

	async openEmbeddedSheet($event) {
		const data = $event.target.dataset;
		let item = await fromUuid(data.embeddedEdit);
		item?.sheet.render(true);
	};

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

	async genericEmbeddedCreate($event) {
		const data = $event.currentTarget.dataset;
		if (!this[`createCustom${data.embeddedCreate}`]) {
			this.createEmbeddedItem({
				type: data.embeddedCreate,
				name: localizer(
					`dotdungeon.default.name`,
					{ document: `Actor`, type: data.embeddedCreate }
				),
			});
		} else {
			this[`createCustom${data.embeddedCreate}`]($event);
		};
	};

	async genericEmbeddedUpdate($event) {
		const target = $event.delegateTarget;
		const data = target.dataset;
		const item = await fromUuid(data.embeddedId);

		let value = target.value;
		switch (target.type) {
			case "checkbox": value = target.checked; break;
		};

		await item?.update({ [data.embeddedUpdate]: value });
	};

	async genericEmbeddedDelete($event) {
		let data = $event.currentTarget.dataset;
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

	async genericSendToChat($event) {
		const data = $event.currentTarget.dataset;
		const type = data.messageType;
		if (this[`send${type}ToChat`]) {
			return await this[`send${type}ToChat`]($event);
		};
		if (!data.messageContent) {
			console.warn(`.dungeon | Tried to send a chat message with no content`);
			return;
		};
		let message = await ChatMessage.create({
			content: data.messageContent,
			flavor: data.messageFlavor,
			speaker: { actor: this.actor },
		});
		message.render();
	};
};
