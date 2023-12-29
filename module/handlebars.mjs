import helpers from "./helpers/index.mjs";

export const partials = [
	`actors/char-sheet-mvp/partials/dice_choice.hbs`,
	`actors/char-sheet-mvp/partials/stat.hbs`,
	`actors/char-sheet-mvp/partials/skill.hbs`,
	`partials/panel.hbs`,
	`items/aspect.hbs`,

	// All of the partials for the PC sheet panels
	`actors/char-sheet-mvp/panels/aspect.pc.hbs`,
	`actors/char-sheet-mvp/panels/backpack.pc.hbs`,
	`actors/char-sheet-mvp/panels/mounts.pc.hbs`,
	`actors/char-sheet-mvp/panels/profile.pc.hbs`,
	`actors/char-sheet-mvp/panels/roles.pc.hbs`,
	`actors/char-sheet-mvp/panels/spells.pc.hbs`,
	`actors/char-sheet-mvp/panels/storage.pc.hbs`,
	`actors/char-sheet-mvp/panels/summons.pc.hbs`,
	`actors/char-sheet-mvp/panels/sync.pc.hbs`,
	`actors/char-sheet-mvp/panels/weapons.pc.hbs`,
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
		/*
		Converts a path/to/template.pc.hbs into a "pc.template" alias for
		ease of use in partial referencing
		*/
		const alias = partial
			.split(`/`)
			.pop()
			.split(`.`)
			.slice(0, -1)
			.reverse()
			.join(`.`);
		paths[`dotdungeon.${alias}`] = path;
	};

	console.debug(`Loaded ${partials.length} partials`);
	console.groupEnd();
	return loadTemplates(paths);
};