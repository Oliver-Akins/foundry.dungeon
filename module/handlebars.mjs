import helpers from "./helpers/index.mjs";

export const partials = [
	`actors/char-sheet-mvp/partials/dice_choice.hbs`,
	`actors/char-sheet-mvp/partials/stat.hbs`,
	`actors/char-sheet-mvp/partials/skill.hbs`,
	`partials/panel.hbs`,
	`items/aspect.hbs`,
];

export async function registerHandlebarsHelpers() {
	Handlebars.registerHelper(helpers);
};

export async function preloadHandlebarsTemplates() {
	console.groupCollapsed(`.dungeon | Handlebars template loading`)
	const pathPrefix = `systems/dotdungeon/templates/`;

	const paths = {};

	for ( const partial of partials ) {
		console.debug(`Loading partial: ${partial}`);
		const path = `${pathPrefix}${partial}`;
		paths[`dotdungeon.${partial.split(`/`).pop().replace(`.hbs`, ``)}`] = path;
	};

	console.debug(`Loaded ${partials.length} partials`);
	console.groupEnd();
	return loadTemplates(paths);
};