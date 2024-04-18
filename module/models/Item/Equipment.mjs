import { DescribedItemData } from "./DescribedItemData.mjs";

export class EquipmentItemData extends DescribedItemData {
	static defineSchema() {
		const fields = foundry.data.fields;
		return foundry.utils.mergeObject(super.defineSchema(), {});
	};
};
