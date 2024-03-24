import { DotDungeonItem } from "./GenericItem.mjs";

const secondsInAMinute = 60;
const secondsInAnHour = 60 * secondsInAMinute;

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
	};

	get friendlyDuration() {
		let friendly = ``;
		let duration = this.system.deactivateAfter;
		if (duration >= secondsInAnHour) {
			let hours = Math.floor(duration / secondsInAnHour);
			friendly += `${hours}h`;
			duration -= hours * secondsInAnHour;
		};
		if (duration >= secondsInAMinute) {
			let minutes = Math.floor(duration / secondsInAMinute);
			friendly += `${minutes}m`;
			duration -= minutes * secondsInAMinute;
		};
		if (duration > 0) {
			friendly += `${duration}s`;
		};
		return friendly;
	};
};
