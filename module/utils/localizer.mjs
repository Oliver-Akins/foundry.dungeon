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

	/*
	Helps prevent recursion on the same key so that we aren't doing excess work.
	*/
	const localizedSubkeys = new Map();
	for (const match of subkeys) {
		const subkey = match.groups.key;
		if (localizedSubkeys.has(subkey)) continue;
		localizedSubkeys.set(subkey, localizer(subkey, args, depth + 1));
	};

	return localized.replace(
		localizerConfig.subKeyPattern,
		(_fullMatch, subkey) => {
			return localizedSubkeys.get(subkey);
		}
	);
};
