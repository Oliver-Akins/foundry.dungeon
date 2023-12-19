export default function() {
	game.settings.register(`dotdungeon`, `showAvatarOnSheet`, {
		name: `dotdungeon.settings.showAvatarOnSheet.name`,
		hint: `dotdungeon.settings.showAvatarOnSheet.description`,
		scope: `client`,
		type: Boolean,
		config: true,
		default: true,
		requiresReload: false,
	});
};