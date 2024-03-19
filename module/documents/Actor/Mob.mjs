import { DotDungeonActor } from "./GenericActor.mjs";

export class Mob extends DotDungeonActor {
	getRollData() {
		const data = {
			initiative: this.system.initiative ?? 0,
		};
		return data;
	};
};
