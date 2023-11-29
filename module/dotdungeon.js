// Class imports
import { PlayerActor } from "./documents/PlayerActor.js";
import { PlayerSheet } from "./sheets/PlayerSheet.mjs";
import { PlayerData } from "./models/PlayerData.js";

// Utility imports
import * as hbs from "./handlebars.js";

// Non-Setup hooks
import "./hooks/hotReload.js";


Hooks.once(`init`, () => {
	console.log(`.dungeon | Init hook started`)
	game.boilerplate = {
		PlayerActor,
	};
	CONFIG.Actor.systemDataModels.player = PlayerData;

	Actors.unregisterSheet("core", ActorSheet);
	// Actors.registerSheet("dotdungeon", CharacterSheet, { makeDefault: true, });
	Actors.registerSheet("dotdungeon.player", PlayerSheet, { makeDefault: true });

	hbs.registerHandlebarsHelpers();
	hbs.preloadHandlebarsTemplates();
	console.info(`.dungeon | Dot Dungeon has been initialized fully`);
});


Hooks.once(`ready`, () => {
	console.info(".dungeon | Ready");
});