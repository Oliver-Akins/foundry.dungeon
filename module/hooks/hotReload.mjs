import * as hbs from "../handlebars.mjs";

const loaders = {
	svg(data) {
		const iconName = data.path.split(`/`).slice(-1)[0].slice(0, -4);
		console.debug(`.dungeon | hot-reloading icon: ${iconName}`);
		Hooks.call(`dd-hmr:svg`, iconName, data);
	},
	hbs(data) {
		if (!hbs.partials.some(p => data.path.endsWith(p))) {
			return true;
		};

		// Compile the new template data.
		let template;
		try {
			template = Handlebars.compile(data.content);
		} catch (err) {
			return console.error(err);
		};

		// Re-register our new partial template & cache it.
		const alias = data.path
			.split(`/`)
			.pop()
			.split(`.`)
			.slice(0, -1)
			.reverse()
			.join(`.`);
		const templateName = `dotdungeon.${alias}`;
		Handlebars.registerPartial(templateName, template);
		_templateCache[templateName] = template;

		return false;
	},
	js() {window.location.reload()},
	mjs() {window.location.reload()},
	css(data) {
		console.debug(`.dungeon | Hot-reloading CSS: ${data.path}`);
		Hooks.call(`dd-hmr:css`, data);
	},
};

Hooks.on(`hotReload`, async (data) => {
	if (!loaders[data.extension]) return;
	return loaders[data.extension](data);
});
