import { DotDungeonItem } from "./GenericItem.mjs";

export class Material extends DotDungeonItem {
	get usedCapacity() {
		let affects = game.settings.get(`dotdungeon`, `materialsAffectCapacity`);
		return affects ? super.usedCapacity : 0;
	};

	get availableLocations() {
		return [
			{ value: null, label: `dotdungeon.location.unknown` },
			{ value: `inventory`, label: `dotdungeon.location.inventory` },
		];
	};
};
