import { DescribedItemData } from "./DescribedItemData.mjs";

export class PetItemData extends DescribedItemData {
	static defineSchema() {
		const fields = foundry.data.fields;
		const parentSchema = super.defineSchema();

		delete parentSchema.quantity;
		delete parentSchema.quantity_affects_used_capacity;
		delete parentSchema.usage_cost;

		return mergeObject(parentSchema, {
			upkeep: new fields.NumberField({ initial: null, nullable: true }),
			pokeballd: new fields.BooleanField({ initial: true }),
		});
	};
};
