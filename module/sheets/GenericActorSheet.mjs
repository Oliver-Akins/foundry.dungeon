import DOTDUNGEON from "../config.mjs";

export class GenericActorSheet extends ActorSheet {
	_expanded = new Set();

	#propogatedSettings = [
		`devMode`,
		`showAvatarOnSheet`,
		`playersCanChangeGroup`,
		`resourcesOrSupplies`,
	];

	async getData() {
		const ctx = {};

		// Send all of the settings that sheets need into their context
		ctx.settings = {};
		for (const setting of this.#propogatedSettings) {
			ctx.settings[setting] = game.settings.get(`dotdungeon`, setting);
		};

		ctx.isGM = game.users.current.hasRole(CONST.USER_ROLES.ASSISTANT);

		ctx.meta = {
			expanded: this._expanded,
			idp: this.actor.uuid,
		};

		ctx.actor = this.actor;
		ctx.config = DOTDUNGEON;
		ctx.icons = CONFIG.CACHE.icons;

		return ctx;
	};

	activateListeners(html) {
		super.activateListeners(html);

		if (this.document.isEmbedded) return;
		if (!this.isEditable) return;
		console.debug(`.dungeon | Generic sheet adding listeners`);

		html.find(`summary`).on(`click`, this._handleSummaryToggle.bind(this));
		html.find(`[data-roll-formula]`).on(`click`, this._handleRoll.bind(this));
		html.find(`[data-embedded-update-on="change"]`)
			.on(`change`, this.genericEmbeddedUpdate.bind(this));
		html.find(`[data-embedded-update-on="blur"]`)
			.on(`blur`, this.genericEmbeddedUpdate.bind(this));
		html.find(`[data-embedded-delete]`)
			.on(`click`, this.genericEmbeddedDelete.bind(this));
		html.find(`[data-embedded-create]`)
			.on(`click`, this.genericEmbeddedCreate.bind(this));
		html.find(`[data-message-type]`)
			.on(`click`, this.genericSendToChat.bind(this));
		html.find(`[data-embedded-edit]`)
			.on(`click`, this.openEmbeddedSheet.bind(this));
		html.find(`button[data-increment]`)
			.on(`click`, this._incrementValue.bind(this));
		html.find(`button[data-decrement]`)
			.on(`click`, this._decrementValue.bind(this));
		html.find(`button[data-embedded-increment]`)
			.on(`click`, this.genericEmbeddedIncrement.bind(this));
		html.find(`button[data-embedded-decrement]`)
			.on(`click`, this.genericEmbeddedDecrement.bind(this));
	};

	async _handleRoll($e) {
		let data = $e.currentTarget.dataset;
		console.debug(`.dungeon | Attempting to roll with formula "${data.rollFormula}"`);

		let flavor;
		if (data.rollLabel) {
			flavor = game.i18n.localize(data.rollLabel);
		};

		let roll = new Roll(data.rollFormula);
		await roll.evaluate();
		await roll.toMessage({
			speaker: ChatMessage.getSpeaker({ actor: this.actor }),
			flavor,
		});
	};

	async _incrementValue($e) {
		const target = $e.currentTarget;
		const data = target.dataset;
		const value = getProperty(this.actor, data.increment);
		if (typeof value != "number") {
			return;
		};
		this.actor.update({ [data.increment]: value + 1 });
	};

	async _decrementValue($e) {
		const target = $e.currentTarget;
		const data = target.dataset;
		const value = getProperty(this.actor, data.decrement);
		if (typeof value != "number") {
			return;
		};
		this.actor.update({ [data.decrement]: value - 1 });
	};

	async _handleSummaryToggle($e) {
		let data = $e.currentTarget.dataset;
		let open = $e.currentTarget.parentNode.open;
		console.debug(`.dungeon | Collapse ID: ${data.collapseId} (open: ${open})`);

		/*
		This seeming inversion of logic is due to the fact that this handler
		gets called before the element is updated to include/reflect the
		change, so if the parentNode doesn't actually have it, then we're
		opening it and vice-versa.
		*/
		if (!open) {
			this._expanded.add(data.collapseId);
		} else {
			this._expanded.delete(data.collapseId);
		};
	};

	async openEmbeddedSheet($event) {
		const data = $event.target.dataset;
		let item = await fromUuid(data.embeddedEdit);
		item?.sheet.render(true);
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
		const target = $event.currentTarget;
		const data = target.dataset;
		const item = await fromUuid(data.embeddedId);

		let value = target.value;
		switch (target.type) {
			case "checkbox": value = target.checked; break;
		};

		await item?.update({ [data.embeddedUpdate]: value });
	};

	async genericEmbeddedIncrement($event) {
		const target = $event.currentTarget;
		const data = target.dataset;
		const item = await fromUuid(data.embeddedId);
		const value = getProperty(item, data.embeddedIncrement);
		if (typeof value != "number") {
			return;
		};
		await item?.update({ [data.embeddedIncrement]: value + 1 });
	};

	async genericEmbeddedDecrement($event) {
		const target = $event.currentTarget;
		const data = target.dataset;
		const item = await fromUuid(data.embeddedId);
		const value = getProperty(item, data.embeddedDecrement);
		if (typeof value != "number") {
			return;
		};
		await item?.update({ [data.embeddedDecrement]: value - 1 });
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
