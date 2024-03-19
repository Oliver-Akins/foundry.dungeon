import { DotDungeonItem } from "./GenericItem.mjs";

export class Aspect extends DotDungeonItem {
	async _preCreate() {
		if (this.isEmbedded) {
			return await this.actor?.preItemEmbed(this);
		};
	}
};
