import { DescribedItemData } from "./DescribedItemData.mjs";

export class StructureItemData extends DescribedItemData {
	static defineSchema() {
		const fields = foundry.data.fields;
		return mergeObject(super.defineSchema(), {
			one_night: new fields.NumberField({
				initial: null,
				nullable: true,
			}),
			upkeep: new fields.NumberField({
				initial: null,
				nullable: true,
			}),
			construction_length: new fields.NumberField({
				min: 0,
				initial: 0,
				nullable: false,
			}),
		});
	};
};