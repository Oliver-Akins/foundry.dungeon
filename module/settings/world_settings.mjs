export default function() {
	game.settings.register(`dotdungeon`, `playersCanChangeGroup`, {
		name: `dotdungeon.settings.playersCanChangeGroup.name`,
		hint: `dotdungeon.settings.playersCanChangeGroup.description`,
		scope: `world`,
		config: true,
		type: Boolean,
		default: false,
		requiresReload: false,
	});

	game.settings.register(`dotdungeon`, `resourcesOrSupplies`, {
		name: `dotdungeon.settings.resourcesOrSupplies.name`,
		hint: `dotdungeon.settings.resourcesOrSupplies.description`,
		scope: `world`,
		config: true,
		type: String,
		choices: {
			"supplies": "dotdungeon.settings.resourcesOrSupplies.option.supplies",
			"resources": "dotdungeon.settings.resourcesOrSupplies.option.resources"
		},
		default: "resources",
		requiresReload: false,
	});
};