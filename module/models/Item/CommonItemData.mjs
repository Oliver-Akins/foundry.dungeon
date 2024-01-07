export class CommonItemData extends foundry.abstract.DataModel {
	static defineSchema() {
		const fields = foundry.data.fields;
		return {
			name: new fields.StringField({
				initial: ``,
				blank: true,
				trim: true,
			}),
			cost: new fields.NumberField({
				initial: null,
				nullable: true,
			}),
		};
	};
};
