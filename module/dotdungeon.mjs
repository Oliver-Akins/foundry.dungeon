// Data Models
import { AspectItemData } from "./models/Item/Aspect.mjs";
import { SpellItemData } from "./models/Item/Spell.mjs";
import { PlayerData } from "./models/PlayerData.mjs";
import { SyncData } from "./models/SyncData.mjs";

// Main Documents
import { ActorHandler } from "./documents/Actor/Handler.mjs";
import { ItemHandler } from "./documents/Item/Handler.mjs";

// Character Sheets
import { SpellSheet } from "./sheets/SpellSheet.mjs";
import { AspectSheet } from "./sheets/AspectSheet.mjs";
import { PlayerSheet } from "./sheets/PlayerSheet.mjs";
import { BasicSyncSheet } from "./sheets/SyncVariations/BasicSyncSheet.mjs";

// Utility imports
import * as hbs from "./handlebars.mjs";

// Non-Setup hooks
import "./hooks/hotReload.mjs";

// Misc Imports
import loadSettings from "./settings/index.mjs";
import DOTDUNGEON from "./config.mjs";


Hooks.once(`init`, () => {
	console.debug(`.dungeon | Initializing`);

	loadSettings();

	CONFIG.Actor.dataModels.player = PlayerData;
	CONFIG.Actor.dataModels.sync = SyncData;
	CONFIG.Item.dataModels.aspect = AspectItemData;
	CONFIG.Item.dataModels.spell = SpellItemData;
	CONFIG.Actor.documentClass = ActorHandler;
	CONFIG.Item.documentClass = ItemHandler;

	CONFIG.DOTDUNGEON = DOTDUNGEON;

	Actors.unregisterSheet("core", ActorSheet);
	Actors.registerSheet("dotdungeon", PlayerSheet, {
		makeDefault: true,
		types: ["player"],
		label: "dotdungeon.sheet-names.PlayerSheet"
	});
	Actors.registerSheet("dotdungeon", BasicSyncSheet, {
		makeDefault: true,
		types: ["sync"],
		label: "dotdungeon.sheet-names.SyncSheet.basic"
	});

	Items.registerSheet("dotdungeon", AspectSheet, {
		makeDefault: true,
		types: ["aspect"],
		label: "dotdungeon.sheet-names.AspectSheet"
	});
	Items.registerSheet("dotdungeon", SpellSheet, {
		makeDefault: true,
		types: ["spell"],
		label: "dotdungeon.sheet-names.SpellSheet"
	});

	hbs.registerHandlebarsHelpers();
	hbs.preloadHandlebarsTemplates();
});


Hooks.once(`ready`, () => {
	console.debug(".dungeon | Ready");

	let defaultTab = game.settings.get(`dotdungeon`, `defaultTab`);
	if (defaultTab ) {
		if (!ui.sidebar?.tabs?.[defaultTab]) {
			console.error(`Couldn't find a sidebar tab with ID:`, defaultTab);
		} else {
			console.debug(`Switching sidebar tab to:`, defaultTab);
			ui.sidebar.tabs[defaultTab].activate();
		};
	};
});