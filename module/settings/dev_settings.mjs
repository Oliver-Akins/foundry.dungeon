export default function() {
	game.settings.register(`dotdungeon`, `devMode`, {
		scope: `client`,
		type: Boolean,
		config: false,
		default: false,
		requiresReload: false,
	});
};