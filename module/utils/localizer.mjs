import { localizerConfig } from "../config.mjs";

export function localizer(key, args = {}, depth = 0) {
	if (key instanceof Handlebars.SafeString) key = key.toString();

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
