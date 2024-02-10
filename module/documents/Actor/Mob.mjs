/** @this {Actor} */
function getRollData() {
	const data = {
		initiative: this.system.initiative ?? 0,
	};
	return data;
};

export default {
	getRollData,
};
