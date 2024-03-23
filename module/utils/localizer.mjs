import { localizerConfig } from "../config.mjs";

export function handlebarsLocalizer(key, ...args) {
	let data = args[0]
	if (args.length === 1) data = args[0].hash;
	if (key instanceof Handlebars.SafeString) key = key.toString();
	const localized = localizer(key, data);
	return localized;
};

export function localizer(key, args = {}, depth = 0) {
	/** @type {string} */
	let localized = game.i18n.format(key, args);
	const subkeys = localized.matchAll(localizerConfig.subKeyPattern);

	// Short-cut to help prevent infinite recursion
	if (depth > localizerConfig.maxDepth) {
		return localized;
	};

	for (const match of subkeys) {
		const subkey = match.groups.key;
		localized =
			localized.slice(0, match.index)
			+ localizer(subkey, args, depth + 1)
			+ localized.slice(match.index + subkey.length + 1)
	};
	return localized;
};
