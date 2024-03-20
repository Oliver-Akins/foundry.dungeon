import { DotDungeonItem } from "./GenericItem.mjs";

export class Material extends DotDungeonItem {
	get usedCapacity() {
		let affects = game.settings.get(`dotdungeon`, `materialsAffectCapacity`);
		console.log(`materialsAffectCapacity =`, affects)
		return affects ? super.usedCapacity : 0;
	};
};
