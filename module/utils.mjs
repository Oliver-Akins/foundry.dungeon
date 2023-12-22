export function reloadWindows(type = null) {
	if (!type) {
		for (const window of globalThis.ui.windows) {
			window.render(true);
		};
		return;
	};
	for (const window of globalThis.ui.windows) {
		if (window instanceof type) {
			window.render(true);
		};
	};
};