// Data Models
import { AspectItemData } from "./models/AspectItemData.mjs";
import { PlayerData } from "./models/PlayerData.mjs";
import { SyncData } from "./models/SyncData.mjs";

// Main Documents
import { PlayerActor } from "./documents/PlayerActor.mjs";
import { AspectItem } from "./documents/AspectItem.mjs";

// Character Sheets
import { AspectSheet } from "./sheets/AspectSheet.mjs";
import { PlayerSheet } from "./sheets/PlayerSheet.mjs";
import { BasicSyncSheet } from "./sheets/SyncVariations/BasicSyncSheet.mjs";

// Utility imports
import * as hbs from "./handlebars.mjs";

// Non-Setup hooks
import "./hooks/hotReload.mjs";

// Misc Imports
import loadSettings from "./settings/index.mjs";


Hooks.once(`init`, () => {
	console.debug(`.dungeon | Initializing`);

	loadSettings();

	game.boilerplate = {
		PlayerActor,
		AspectItem,
	};
	CONFIG.Actor.dataModels.player = PlayerData;
	CONFIG.Actor.dataModels.sync = SyncData;
	CONFIG.Item.dataModels.aspect = AspectItemData;

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

	hbs.registerHandlebarsHelpers();
	hbs.preloadHandlebarsTemplates();
});


Hooks.once(`ready`, () => {
	console.debug(".dungeon | Ready");
});