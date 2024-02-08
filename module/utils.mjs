/**
 * @param {string} path
 * @param {object} data
 * @returns {unknown}
 */
export function getPath(path, data) {
	if (!path.includes(`.`)) {
		return data[path];
	};
	let [ key, nextPath ] = path.split(`.`, 2)
	return getPath(
		nextPath,
		data[key]
	);
};