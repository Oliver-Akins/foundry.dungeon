import * as hbs from "../handlebars.mjs";

Hooks.on(`hotReload`, async (data) => {
	if (data.extension !== 'hbs') {
		return true;
	};

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

	// Re-render open windows
	for (const window of ui.windows) {
		window.render(true);
	};

	return true;
});