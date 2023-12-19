// Data Models
import { AspectItemData } from "./models/AspectItemData.mjs";
import { PlayerData } from "./models/PlayerData.mjs";

// Main Documents
import { PlayerActor } from "./documents/PlayerActor.mjs";
import { AspectItem } from "./documents/AspectItem.mjs";

// Character Sheets
import { AspectSheet } from "./sheets/AspectSheet.mjs";
import { PlayerSheet } from "./sheets/PlayerSheet.mjs";


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
	CONFIG.Item.dataModels.aspect = AspectItemData;

	Actors.unregisterSheet("core", ActorSheet);
	Actors.registerSheet("dotdungeon.sheet", PlayerSheet, { makeDefault: true });

	Items.registerSheet("dotdungeon.sheet", AspectSheet, { makeDefault: true });

	hbs.registerHandlebarsHelpers();
	hbs.preloadHandlebarsTemplates();
});


Hooks.once(`ready`, () => {
	console.debug(".dungeon | Ready");
});