import { DotDungeonItem } from "./GenericItem.mjs";

export class Aspect extends DotDungeonItem {
	async _preCreate() {
		if (this.isEmbedded) {
			if (this.actor.atAspectLimit) {
				ui.notifications.error(
					game.i18n.format(
						`dotdungeon.notification.error.aspect-limit-reached`,
						{ limit: game.settings.get(`dotdungeon`, `aspectLimit`) }
					),
					{ console: false }
				);
				return false;
			};

			return await this.actor?.preItemEmbed(this);
		};
	}
};
