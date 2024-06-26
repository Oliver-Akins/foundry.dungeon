import { localizer } from "../utils/localizer.mjs";
import DOTDUNGEON from "../config.mjs";

export class GenericActorSheet extends ActorSheet {
	static get defaultOptions() {
		let opts = foundry.utils.mergeObject(
			super.defaultOptions,
			{
				scrollY: [`.scrollable`],
			}
		);
		opts.classes.push(`dotdungeon`);
		return opts;
	};

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
		ctx.icons = {};

		return ctx;
	};

	activateListeners(html) {
		super.activateListeners(html);

		if (this.document.isEmbedded) return;
		if (!this.isEditable) return;
		console.debug(`.dungeon | Generic sheet adding listeners`);

		/*
		Custom element event listeners because Foundry doesn't listen to them by
		default.
		*/
		html.find(
			CONFIG.CACHE.componentListeners.map(n => `${n}[name]`).join(`,`)
		).on(`change`, () => this._onChangeInput.bind(this));

		/*
		Utility event listeners that apply
		*/
		html.find(`[data-collapse-id]`).on(`click`, this._handleSummaryToggle.bind(this));
		html.find(`[data-roll-formula]`).on(`click`, this._handleRoll.bind(this));
		html.find(`[data-embedded-update-on="change"]`)
			.on(`change`, this.genericEmbeddedUpdate.bind(this));
		html.find(`[data-embedded-update-on="blur"]`)
			.on(`blur`, this.genericEmbeddedUpdate.bind(this));
		html.find(`[data-embedded-delete]`)
			.on(`click`, ($e) => {
				const id = $e.currentTarget.dataset.embeddedDelete;
				this.genericEmbeddedDelete.bind(this)(id);
			});
		html.find(`[data-embedded-create]`)
			.on(`click`, this.genericEmbeddedCreate.bind(this));
		html.find(`[data-message-type]`)
			.on(`click`, this.genericSendToChat.bind(this));
		html.find(`[data-embedded-edit]`)
			.on(`click`, ($e) => {
				const id = $e.currentTarget.dataset.embeddedEdit;
				this.openEmbeddedSheet.bind(this)(id);
			})
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
		$e.stopPropagation();
		let target = $e.currentTarget;
		let parent = target.closest(`.collapse`);
		let data = target.dataset;
		console.debug(`.dungeon | Collapse ID: ${data.collapseId}`);

		if (!this._expanded.has(data.collapseId)) {
			this._expanded.add(data.collapseId);
			parent.setAttribute(`open`, ``);
		} else {
			this._expanded.delete(data.collapseId);
			parent.removeAttribute(`open`, ``);
		};
	};

	async openEmbeddedSheet(item_id) {
		let item = await fromUuid(item_id);
		item?.sheet.render(true);
	};

	async genericEmbeddedCreate($event) {
		const data = $event.currentTarget.dataset;
		if (!this[`createCustom${data.embeddedCreate}`]) {
			this.actor.createEmbeddedItem({
				type: data.embeddedCreate,
				name: localizer(
					`dotdungeon.default.name`,
					{ document: `Item`, type: data.embeddedCreate }
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

	async genericEmbeddedDelete(item_uuid) {
		let item = await fromUuid(item_uuid);

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
