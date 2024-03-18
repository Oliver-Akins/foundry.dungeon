import { DescribedItemData } from "./DescribedItemData.mjs";

export class AspectItemData extends DescribedItemData {
	static defineSchema() {
		const fields = foundry.data.fields;
		return {
			used: new fields.BooleanField({ initial: false }),
			/** The number of seconds that the effect of the aspect stays */
			deactivateAfter: new fields.NumberField({ nullable: true }),
		};
	};
};
