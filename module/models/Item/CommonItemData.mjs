export class CommonItemData extends foundry.abstract.DataModel {
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
