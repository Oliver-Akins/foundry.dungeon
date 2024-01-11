/**
 * Checks if the specified collapseId is currently open, so that during re-renders
 * it remains open or closed.
 *
 * @param {Set<string>} expanded A set indicating what collapseIds are expanded
 * @param {string} collapseId The collapseId to check for
 * @returns {"open"|null} The HTML insertion indicating the details is expanded
 */
export function detailsExpanded(expanded, collapseId) {
	if (expanded.has(collapseId)) {
		return `open`;
	}
	return ``;
};