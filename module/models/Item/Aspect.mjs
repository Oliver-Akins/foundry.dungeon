import { DescribedItemData } from "./DescribedItemData.mjs";

export class AspectItemData extends DescribedItemData {
	static defineSchema() {
		const fields = foundry.data.fields;
		const parentSchema = super.defineSchema();

		// Purge fields that I don't want in this schema
		delete parentSchema.quantity;
		delete parentSchema.quantity_affects_used_capacity;
		delete parentSchema.usage_cost;

		return mergeObject(parentSchema, {
			used: new fields.BooleanField({ initial: false }),
			/** The number of seconds that the effect of the aspect stays */
			deactivateAfter: new fields.NumberField({ nullable: true }),
		});
	};
};
