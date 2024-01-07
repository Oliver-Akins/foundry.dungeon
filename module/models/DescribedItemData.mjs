export class DescribedItemData extends CommonItemData {
	static defineSchema() {
		const fields = foundry.data.fields;
		return mergeObject(super.defineSchema(), {
			description: fields.StringField({
				initial: ``,
				blank: true,
				trim: true,
			}),
		});
	};
};