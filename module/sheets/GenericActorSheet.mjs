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
			.on(`change`, this.actor.genericEmbeddedUpdate.bind(this.actor));
		html.find(`[data-embedded-update-on="blur"]`)
			.on(`blur`, this.actor.genericEmbeddedUpdate.bind(this.actor));
		html.find(`[data-embedded-delete]`)
			.on(`click`, this.actor.genericEmbeddedDelete.bind(this.actor));
		html.find(`[data-embedded-create]`)
			.on(`click`, this.actor.genericEmbeddedCreate.bind(this.actor));
		html.find(`[data-message-type]`)
			.on(`click`, this.actor.genericSendToChat.bind(this.actor));
		html.find(`[data-embedded-edit]`)
			.on(`click`, this.actor.openEmbeddedSheet.bind(this.actor));
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

	_handleSummaryToggle($e) {
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
};