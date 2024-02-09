export class SyncData extends foundry.abstract.TypeDataModel {
	static defineSchema() {
		const fields = foundry.data.fields;
		return {
			value: new fields.NumberField({
				integer: true,
				initial: 100,
			}),
			rest_dice: new fields.NumberField({
				integer: true,
				initial: 0,
				min: 0,
			}),
			milestones_hit: new fields.SetField(
				new fields.NumberField({ integer: true, }),
				{ initial: [] },
			),
		};
	};
};
