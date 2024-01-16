import { DescribedItemData } from "./DescribedItemData.mjs";

export class PetItemData extends DescribedItemData {
	static defineSchema() {
		const fields = foundry.data.fields;
		return mergeObject(super.defineSchema(), {
			purchase: new fields.NumberField({ initial: 0, }),
			upkeep: new fields.NumberField({ intial: null, nullable: true }),
			pokeballd: new fields.BooleanField({ initial: false }),
		});
	};
};
