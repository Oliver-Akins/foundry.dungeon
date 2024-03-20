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

	game.settings.register(`dotdungeon`, `materialsAffectCapacity`, {
		name: `dotdungeon.settings.materialsAffectCapacity.name`,
		hint: `dotdungeon.settings.materialsAffectCapacity.description`,
		scope: `world`,
		config: true,
		type: Boolean,
		default: true,
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
		default: "supplies",
		requiresReload: false,
	});

	/*
	These two settings are used in coordination in order to prevent the Aspect
	Limit from being set to a value that just absolutely stupid (i.e. negative
	values, non-integer values). The preSaveAspectLimit is the one that's actually
	displayed in the settings dialogue, while the aspectLimit is the one that's
	used by all of the code.
	*/
	game.settings.register(`dotdungeon`, `aspectLimit`, {
		scope: `world`,
		default: 1,
		type: Number,
	});
	game.settings.register(`dotdungeon`, `preSaveAspectLimit`, {
		name: `dotdungeon.settings.aspectLimit.name`,
		hint: `dotdungeon.settings.aspectLimit.description`,
		scope: `world`,
		config: true,
		default: 1,
		type: Number,
		onChange(value) {
			const current = game.settings.get(`dotdungeon`, `aspectLimit`);
			if (current == value) return;

			if (value < 0) {
				ui.notifications.warn(
					`dotdungeon.notification.warn.negative-aspect-limit`,
					{ localize: true, console: false }
				);
				game.settings.set(`dotdungeon`, `preSaveAspectLimit`, current);
				return;
			};
			let floored = Math.floor(value);
			game.settings.set(`dotdungeon`, `aspectLimit`, floored);
			game.settings.set(`dotdungeon`, `preSaveAspectLimit`, floored);
		},
	});
};
