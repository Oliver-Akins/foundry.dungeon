export class MobData extends foundry.abstract.TypeDataModel {
	static defineSchema() {
		const fields = foundry.data.fields;
		return {
			dice: new fields.StringField({
				initial: ``,
			}),
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
		};
	};
};
