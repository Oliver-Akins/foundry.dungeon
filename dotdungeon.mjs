// Data Models
import { DescribedItemData } from "./module/models/DescribedItemData.mjs";
import { AspectItemData } from "./module/models/AspectItemData.mjs";
import { PlayerData } from "./module/models/PlayerData.mjs";
import { SyncData } from "./module/models/SyncData.mjs";

// Main Documents
import { ActorHandler } from "./module/documents/Actor/Handler.mjs";

// Character Sheets
import { AspectSheet } from "./module/sheets/AspectSheet.mjs";
import { PlayerSheet } from "./module/sheets/PlayerSheet.mjs";
import { BasicSyncSheet } from "./module/sheets/SyncVariations/BasicSyncSheet.mjs";

// Utility imports
import * as hbs from "./module/handlebars.mjs";

// Non-Setup hooks
import "./module/hooks/hotReload.mjs";

// Misc Imports
import loadSettings from "./module/settings/index.mjs";
import { DOTDUNGEON } from "./module/config.mjs";


Hooks.once(`init`, () => {
	console.debug(`.dungeon | Initializing`);

	loadSettings();

	CONFIG.Actor.dataModels.player = PlayerData;
	CONFIG.Actor.dataModels.sync = SyncData;
	CONFIG.Item.dataModels.aspect = AspectItemData;
	CONFIG.Item.dataModels.spell = DescribedItemData;
	CONFIG.Actor.documentClass = ActorHandler;

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

	hbs.registerHandlebarsHelpers();
	hbs.preloadHandlebarsTemplates();
});


Hooks.once(`ready`, () => {
	console.debug(".dungeon | Ready");

	if (game.settings.get(`dotdungeon`, `devMode`)) {
		let tab = game.settings.get(`dotdungeon`, `defaultTab`);
		if (!ui.sidebar?.tabs?.[tab]) {
			console.error(`Couldn't find a sidebar tab with ID:`, tab);
		} else {
			console.debug(`Switching sidebar tab to:`, tab);
			ui.sidebar.tabs[tab].activate();
		};
	};
});