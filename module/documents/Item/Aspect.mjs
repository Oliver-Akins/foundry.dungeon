/** @this {ItemHandler} */
async function _preCreate(_data, _options, _user) {
	if (this.isEmbedded) {
		return await this.actor?.preItemEmbed(this);
	};
};

export default {
	_preCreate,
};