/** @this {Item} */
async function _preCreate(data, options, user) {
	if (this.parent.itemTypes.aspect.length > 0) {
		ui.notifications.error(
			game.i18n.format(
				`dotdungeon.notification.error.aspect-limit-reached`,
				{ limit: 1 }
			),
			{ console: false }
		);
		return false;
	};
};

export default {
	_preCreate,
};