import { DotDungeonActor } from "./GenericActor.mjs";

export class Player extends DotDungeonActor {

	applyActiveEffects() {
		super.applyActiveEffects();

		// These are the (groups of) fields that ActiveEffects may modify safely
		// and remain editable in the sheet. This needs to be done because of default
		// Foundry behaviour that otherwise prevents these fields from being edited
		delete this.overrides.system.stats;
		delete this.overrides.system.skills;
	};

	async createCustomPet() {
		const body = new URLSearchParams({
			number: 1,
			animal: `Cat`,
			"X-Requested-With": "fetch"
		});
		const r = await fetch(
			`https://randommer.io/pet-names`,
			{
				method: "POST",
				body
			}
		);
		await this.createEmbeddedItem([{
			type: `pet`,
			name: (await r.json())[0] ?? game.i18n.localize(`dotdungeon.defaults.pet.name`),
		}]);
	};

	get atAspectLimit() {
		let limit = game.settings.get(`dotdungeon`, `aspectLimit`);
		return this.itemTypes.aspect.length >= limit;
	};

	getRollData() {
		const data = {
			initiative: this.system.stats.hands ?? 0,
			stats: this.system.stats,
		};
		return data;
	};
};
