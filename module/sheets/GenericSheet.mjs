export class GenericSheet extends ActorSheet {
	#propogatedSettings = [
		`devMode`,
		`showAvatarOnSheet`
	];

	getData() {
		const ctx = super.getData();

		// Send all of the settings that sheets need into their context
		ctx.settings = {};
		for (const setting of this.#propogatedSettings) {
			ctx.settings[setting] = game.settings.get(`dotdungeon`, setting);
		};

		return ctx;
	}
}