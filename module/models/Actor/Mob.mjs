export class MobData extends foundry.abstract.TypeDataModel {
	static defineSchema() {
		const fields = foundry.data.fields;
		return {
			bonus: new fields.NumberField({
				initial: 0,
				nullable: false,
			}),
			initiative: new fields.NumberField({
				initial: null,
				nullable: true,
			}),
			morale: new fields.NumberField({
				initial: null,
				nullable: true,
			}),
			drops: new fields.StringField({
				initial: ``,
				blank: true,
			}),
			stunts: new fields.StringField({
				initial: ``,
				blank: true,
			}),
			immune: new fields.StringField({
				initial: ``,
				blank: true,
			}),
			weak: new fields.StringField({
				initial: ``,
				blank: true,
			}),
			bytes: new fields.NumberField({
				initial: 0,
				min: 0,
			}),
			description: new fields.StringField({
				initial: ``,
				blank: true,
			}),
			dice: new fields.ArrayField(
				new fields.SchemaField({
					// {count}d{sides} x {repeat}
					count: new fields.NumberField({ min: 1 }),
					sides: new fields.NumberField({ min: 2 }),
					repeat: new fields.NumberField({ min: 1 }),
				}),
				{ initial: [] }
			),
		};
	};
};
