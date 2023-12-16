export const partials = [
	`actors/char-sheet-mvp/partials/dice_choice.hbs`,
	`actors/char-sheet-mvp/partials/stat.hbs`,
	`actors/char-sheet-mvp/partials/skill.hbs`,
	`actors/char-sheet-mvp/partials/panel.hbs`,
	`items/aspect.hbs`,
];

export async function registerHandlebarsHelpers() {
	Handlebars.registerHelper({
		"dotdungeon-array": createArray,
		"dotdungeon-toFriendlyDuration": toFriendlyDuration,
		"dotdungeon-objectValue": objectValue
	});
};

export async function preloadHandlebarsTemplates() {
	console.groupCollapsed(`.dungeon | Handlebars template loading`)
	const pathPrefix = `systems/dotdungeon/templates/`;

	const paths = {};

	for ( const partial of partials ) {
		console.debug(`Loading partial: ${partial}`);
		const path = `${pathPrefix}${partial}`;
		paths[`dotdungeon.${partial.split(`/`).pop().replace(`.hbs`, ``)}`] = path;
	}

	console.debug(`Loaded ${partials.length} partials`);
	console.groupEnd();
	return loadTemplates(paths);
};


function createArray(...args) {
	return args.slice(0, -1);
};

function objectValue(obj, keypath) {
	// console.log(obj, keypath.string)
	return keypath
	function helper(o, k) {
		let v = o[k[0]];
		if (typeof v === "object") {
			return helper(v, k.slice(1));
		};
		return v;
	};
	return helper(obj, keypath.string.split(`.`))
};


const secondsInAMinute = 60;
const secondsInAnHour = 60 * secondsInAMinute;
/**
 * Converts a duration into a more human-friendly format
 * @param {number} duration The length of time in seconds
 * @returns The human-friendly time string
 */
function toFriendlyDuration(duration) {
	let friendly = ``;
	if (duration >= secondsInAnHour) {
		let hours = Math.floor(duration / secondsInAnHour);
		friendly += `${hours}h`;
		duration -= hours * secondsInAnHour;
	};
	if (duration >= secondsInAMinute) {
		let minutes = Math.floor(duration / secondsInAMinute);
		friendly += `${minutes}m`;
		duration -= minutes * secondsInAMinute;
	};
	if (duration > 0) {
		friendly += `${duration}s`;
	};
	return friendly;
}