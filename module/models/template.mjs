import { DescribedItemData } from "./DescribedItemData.mjs";

export class TemplateData extends DescribedItemData {
	static defineSchema() {
		const fields = foundry.data.fields;
		return foundry.utils.mergeObject(super.defineSchema(), {
		});
	};
};
