import { DescribedItemData } from "./DescribedItemData.mjs";

export class EquipmentItemData extends DescribedItemData {
	static defineSchema() {
		const fields = foundry.data.fields;
		return mergeObject(super.defineSchema(), {
			extra_inventory: new fields.NumberField({
				initial: null,
				nullable: true,
				required: false,
			}),
			material
		});
	};
};
