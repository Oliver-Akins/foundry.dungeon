export function reloadWindows(type = null) {
	if (!type) {
		for (const window of ui.windows) {
			window.render(true);
		};
		return;
	};
	for (const window of ui.windows) {
		if (window instanceof type) {
			window.render(true);
		};
	};
};