import DOTDUNGEON from "../../config.mjs";

export class CommonItemData extends foundry.abstract.TypeDataModel {
	static defineSchema() {
		const fields = foundry.data.fields;
		return {
			quantity: new fields.NumberField({
				initial: 1,
				min: 0,
				nullable: false,
				integer: true,
			}),
			uses_inventory_slot: new fields.BooleanField({
				initial: true,
				nullable: false,
			}),
			buy: new fields.NumberField({
				initial: null,
				nullable: true,
				integer: true,
			}),
			usage_cost: new fields.NumberField({
				initial: null,
				nullable: true,
				integer: true,
			}),
			tier: new fields.StringField({
				initial: `simple`,
				nullable: false,
				choices: DOTDUNGEON.itemTiers,
			}),
		};
	};
};
