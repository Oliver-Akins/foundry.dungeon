import DOTDUNGEON from "../config.mjs";

export class GenericDialog extends FormApplication {

	#propogatedSettings = [
		`devMode`,
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
		};

		ctx.config = DOTDUNGEON;
		ctx.icons = CONFIG.CACHE.icons;

		return ctx;
	};

	activateListeners(html) {
		super.activateListeners(html);

		if (!this.isEditable) return;
		console.debug(`.dungeon | Generic dialog adding listeners`);

		html.find(`[data-action]`)
			.on(`click`, this._handleActionClick.bind(this));
	};

	_handleActionClick($e) {
		const data = $e.currentTarget.dataset;
		if (!this[data.action]) return;
		this[data.action].bind(this)($e);
	};
};
