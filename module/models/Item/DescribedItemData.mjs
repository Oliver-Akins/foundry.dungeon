import { CommonItemData } from "./CommonItemData.mjs";

export class DescribedItemData extends CommonItemData {
	static defineSchema() {
		const fields = foundry.data.fields;
		return mergeObject(super.defineSchema(), {
			description: new fields.StringField({
				initial: ``,
				blank: true,
				trim: true,
			}),
		});
	};
};
