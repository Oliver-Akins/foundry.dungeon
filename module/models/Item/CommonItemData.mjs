export class CommonItemData extends foundry.abstract.TypeDataModel {
	static defineSchema() {
		const fields = foundry.data.fields;
		return {
			cost: new fields.NumberField({
				initial: null,
				nullable: true,
			}),
		};
	};
};
