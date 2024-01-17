import { ItemHandler } from "./Handler.mjs";

/** @this {ItemHandler} */
async function _preCreate() {
	if (this.isEmbedded) {
		let actor = this.actor;
		if (actor.type === "settlement") {
			return await actor.preItemEmbed(this);
		};
		ui.notifications.error(
			game.i18n.format(
				`dotdungeon.notification.error.cant-embed-item`,
				{ item: this, actor }
			),
			{ console: false, }
		);
		return false;
	};
};

export default {
	_preCreate,
};