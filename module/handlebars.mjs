import helpers from "./helpers/index.mjs";

export const partials = [
	`actors/char-sheet-mvp/partials/dice_choice.hbs`,
	`actors/char-sheet-mvp/partials/stat.hbs`,
	`actors/char-sheet-mvp/partials/skill.hbs`,
	`partials/panel.hbs`,
	`items/aspect.hbs`,

	// All of the partials for the PC MVP sheet panels
	`actors/char-sheet-mvp/panels/aspect.pc.hbs`,
	`actors/char-sheet-mvp/panels/backpack.pc.hbs`,
	`actors/char-sheet-mvp/panels/mounts.pc.hbs`,
	`actors/char-sheet-mvp/panels/profile.pc.hbs`,
	`actors/char-sheet-mvp/panels/roles.pc.hbs`,
	`actors/char-sheet-mvp/panels/spells.pc.hbs`,
	`actors/char-sheet-mvp/panels/storage.pc.hbs`,
	`actors/char-sheet-mvp/panels/pets.pc.hbs`,
	`actors/char-sheet-mvp/panels/sync.pc.hbs`,
	`actors/char-sheet-mvp/panels/weapons.pc.hbs`,

	// The v2 PC sheet partials
	`actors/char-sheet/v2/partials/stats.v2.pc.hbs`,
	`actors/char-sheet/v2/partials/effects.v2.pc.hbs`,
	`actors/char-sheet/v2/partials/inventory/inventory.v2.pc.hbs`,
	`actors/char-sheet/v2/partials/inventory/player.v2.pc.hbs`,
	`actors/char-sheet/v2/partials/inventory/item-list.v2.pc.hbs`,
	`actors/char-sheet/v2/partials/inventory/storage.v2.pc.hbs`,
	`actors/char-sheet/v2/partials/inventory/items/material.v2.pc.hbs`,
	`actors/char-sheet/v2/partials/inventory/items/untyped.v2.pc.hbs`,
	`actors/char-sheet/v2/partials/inventory/items/aspect.v2.pc.hbs`,
	`actors/char-sheet/v2/partials/inventory/items/weapon.v2.pc.hbs`,
	`actors/char-sheet/v2/partials/inventory/items/pet.v2.pc.hbs`,

	// The partials used for Untyped v2 and other item sheets that don't have a
	// unique design for the other tabs
	`items/untyped/v2/tabs/general.v2.untyped.hbs`,
	`items/untyped/v2/tabs/details.v2.untyped.hbs`,
	`items/untyped/v2/tabs/effects.v2.untyped.hbs`,
	`items/untyped/v2/tabs/settings.v2.untyped.hbs`,

	// The weapon sheet partials
	`items/weapon/v1/tabs/details.v1.weapon.hbs`,
];

export const preAliasedPartials = {
	"dotdungeon.pc.v2.foil": "actors/char-sheet/v2/partials/inventory/items/untyped.v2.pc.hbs",
};

export async function registerHandlebarsHelpers() {
	Handlebars.registerHelper(helpers);
};

export async function preloadHandlebarsTemplates() {
	console.groupCollapsed(`.dungeon | Handlebars template loading`)
	const pathPrefix = `systems/dotdungeon/templates/`;

	const paths = {};

	for (const alias in preAliasedPartials) {
		paths[alias] = `${pathPrefix}${preAliasedPartials[alias]}`;
	};

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
