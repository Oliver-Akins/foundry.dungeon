// Class imports
import { CharacterActor } from "./documents/CharacterActor.js";
import { CharacterSheet } from "./sheets/CharacterSheet.js";

// Utility imports
import * as hbs from "./handlebars.js";

// Non-Setup hooks
import "./hooks/hotReload.js";


Hooks.once(`init`, async () => {
	game.boilerplate = {
		CharacterActor,
	};

	Actors.unregisterSheet("core", ActorSheet);
	Actors.registerSheet("dotdungeon", CharacterSheet, { makeDefault: true, });


	await hbs.registerHandlebarsHelpers();
	await hbs.preloadHandlebarsTemplates()
	console.info(`.dungeon | Dot Dungeon has been initialized fully`);
});


Hooks.once(`ready`, () => {
	console.info(".dungeon | Ready");
});