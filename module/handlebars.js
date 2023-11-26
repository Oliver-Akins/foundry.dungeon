export const partials = [
	"actors/char-sheet-mvp/partials/dice_choice.hbs",
	"actors/char-sheet-mvp/partials/stat.hbs",
	"actors/char-sheet-mvp/partials/skill.hbs",
	"actors/char-sheet-mvp/partials/panel.hbs",
]

export async function registerHandlebarsHelpers() {
	Handlebars.registerHelper({
		"dotdungeon-array": createArray
	});
};

export async function preloadHandlebarsTemplates() {
	console.groupCollapsed(`.dungeon | Handlebars template loading`)
	const pathPrefix = `systems/dotdungeon/templates/`;

	const paths = {};

	for ( const partial of partials ) {
		console.debug(`Loading partial: ${partial}`);
		const path = `${pathPrefix}${partial}`;
		paths[`dotdungeon.${partial.split("/").pop().replace(".hbs", "")}`] = path;
	}

	console.debug(`Loaded ${partials.length} partials`);
	console.groupEnd();
	return loadTemplates(paths);
};


function createArray(...args) {
	return args.slice(0, -1);
};