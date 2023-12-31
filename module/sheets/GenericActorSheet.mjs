export class GenericActorSheet extends ActorSheet {
	_expanded = new Set();

	#propogatedSettings = [
		`devMode`,
		`showAvatarOnSheet`,
		`playersCanChangeGroup`,
		`resourcesOrSupplies`,
	];

	getData() {
		const ctx = super.getData();

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

		return ctx;
	};

	activateListeners(html) {
		super.activateListeners(html);

		if (this.document.isEmbedded) return;
		if (!this.isEditable) return;
		console.debug(`.dungeon | Generic sheet adding listeners`);

		html.find(`summary`).on(`click`, this._handleSummaryToggle.bind(this));
		html.find(`.roll`).on(`click`, this._handleRoll.bind(this));
	};

	async _handleRoll($e) {
		let data = $e.target.dataset;
		if (!data.roll) return;
		console.debug(`.dungeon | Attempting to roll with formula "${data.roll}"`);

		game.i18n

		let roll = new Roll(data.roll);
		await roll.evaluate();
		await roll.toMessage({
			speaker: ChatMessage.getSpeaker({ actor: this.actor }),
		});
	};

	_handleSummaryToggle($e) {
		let data = $e.target.dataset;
		let open = $e.target.parentNode.open;
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