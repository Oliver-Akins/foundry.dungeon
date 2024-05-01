import { DialogManager } from "../../utils/DialogManager.mjs";
import DOTDUNGEON from "../../config.mjs";

export class GenericItemSheet extends ItemSheet {
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
			idp: this.item.uuid,
		};

		ctx.item = this.item;
		ctx.system = this.item.system;
		ctx.flags = this.item.flags;
		ctx.effects = this.item.effects;

		ctx.config = DOTDUNGEON;
		ctx.icons = {};

		return ctx;
	};

	activateListeners(html) {
		super.activateListeners(html);

		if (!this.isEditable) return;
		console.debug(`.dungeon | Adding event listeners for Generic Item: ${this.id}`);

		/*
		Custom element event listeners because Foundry doesn't listen to them by
		default.
		*/
		html.find(
			CONFIG.CACHE.componentListeners.map(n => `${n}[name]`).join(`,`)
		).on(`change`, () => this._onChangeInput.bind(this));

		html.find(`button[data-increment]`)
			.on(`click`, this._incrementValue.bind(this));
		html.find(`button[data-decrement]`)
			.on(`click`, this._decrementValue.bind(this));


		html.find(`[data-help-id]`)
			.on(`click`, this._helpPopup.bind(this));
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

	async _helpPopup($e) {
		const target = $e.currentTarget;
		const data = target.dataset;
		if (!data.helpId) return;
		DialogManager.helpDialog(
			data.helpId,
			data.helpContent,
			data.helpTitle
		);
	};
};
