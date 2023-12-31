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

export const icons = [
	`caret-right.svg`,
	`garbage-bin.svg`,
	`chat-bubble.svg`,
	`dice/d4.svg`,
	`dice/d6.svg`,
	`dice/d8.svg`,
	`dice/d10.svg`,
	`dice/d12.svg`,
	`dice/d20.svg`,
];


export async function registerHandlebarsHelpers() {
	console.log(Handlebars)
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

/**
 * Loads all of the icons that are needed in the handlebars templating to make
 * the sheet look nicer.
 *
 * @returns An object containing icon names to the corresponding HTML data for
 *   displaying the icon
 */
export async function preloadIcons() {
	console.groupCollapsed(`.dungeon | Loading icons for handlebars`);
	const pathPrefix = `systems/dotdungeon/assets/`
	const parsedIcons = {};

	for (const icon of icons) {
		const iconName = icon.split(`/`).slice(-1)[0].slice(0, -4);
		if (icon.endsWith(`.svg`)) {
			try {
				const response = await fetchWithTimeout(`${pathPrefix}${icon}`);
				if (response.status !== 200) { continue };
				const svgData = await response.text();
				parsedIcons[iconName] = svgData;
				console.debug(`Loaded icon: ${icon}`);
			} catch {
				console.error(`Failed to fetch/parse icon: ${icon}`);
				continue;
			};
		}
		else if (icon.endsWith(`.png`)) {
			parsedIcons[iconName] = `<img alt="" src="${pathPrefix}${icon}">`;
			console.debug(`Loaded icon: ${icon}`);
		}
		else {
			console.warn(`Icon "${icon}" failed to be handled by a loader`)
		};
	};

	console.groupEnd();
	return parsedIcons;
};