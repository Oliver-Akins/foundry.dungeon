export default function() {
	game.settings.register(`dotdungeon`, `devMode`, {
		scope: `client`,
		type: Boolean,
		config: false,
		default: false,
		requiresReload: false,
	});

	game.settings.register(`dotdungeon`, `defaultTab`, {
		scope: `client`,
		type: String,
		config: false,
		requiresReload: false,
	});
};
