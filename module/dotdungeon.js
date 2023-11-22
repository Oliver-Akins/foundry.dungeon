import { CharacterActor } from "./documents/CharacterActor.js";
import { CharacterSheet } from "./sheets/CharacterSheet.js";

import * as hbs from "./handlebars.js";

// import diceChoice from "../templates/actors/char-sheet-mvp/partials/dice_choice.hbs?raw";

Hooks.once(`init`, async function () {
	game.boilerplate = {
		CharacterActor,
	};

	Actors.unregisterSheet("core", ActorSheet);
	Actors.registerSheet("dotdungeon", CharacterSheet, { makeDefault: true, });


	await hbs.registerHandlebarsHelpers();
	await hbs.preloadHandlebarsTemplates()
	console.info(`.dungeon | Dot Dungeon has been initialized fully`);
});


Hooks.once(`ready`, function() {
	console.info(".dungeon | Ready");
});