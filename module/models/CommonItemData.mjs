export class CommonItemData extends foundry.abstract.DataModel {
	static defineSchema() {
		const fields = foundry.data.fields;
		return {
			name: fields.StringField({
				initial: ``,
				blank: true,
				trim: true,
			}),
			cost: fields.NumberField({
				initial: null,
				nullable: true,
			}),
		};
	};
};