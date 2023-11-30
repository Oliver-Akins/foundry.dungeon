export class CommonItemData extends foundry.abstract.DataModel {
	static defineSchema() {
		const fields = foundry.data.fields;
		return {
			name: fields.HTMLField({
				blank: true,
				trim: true,
			}),
			cost: fields.NumberField({
				nullable: true,
			})
		};
	};
};