import * as hbs from "../handlebars.js";

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
	const templateName = `dotdungeon.${data.path.split("/").pop().replace(".hbs", "")}`;
	Handlebars.registerPartial(templateName, template);
	_templateCache[templateName] = template;

	// Re-render open windows
	for (const window of ui.windows) {
		window.render(true);
	};

	return false;
});