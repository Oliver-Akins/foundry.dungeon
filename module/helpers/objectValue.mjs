export function objectValue(obj, keypath) {
	function helper(o, k) {
		let v = o[k[0]];
		if (typeof v === "object") {
			return helper(v, k.slice(1));
		};
		return v;
	};
	let resp = helper(obj, keypath.string.split(`.`));
	return resp;
};
