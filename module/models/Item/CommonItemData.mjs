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
			quantity_affects_used_capacity: new fields.BooleanField({
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
				initial: DOTDUNGEON.defaultItemTier,
				nullable: false,
				choices: DOTDUNGEON.itemTiers.map(tier => tier.value),
			}),
			/*
			If this property is set to true, the item will be shown in the combat tab
			list of items. This is shown whether or not the item is marked as "equipped".
			*/
			combat_relevant: new fields.BooleanField({
				initial: false,
				nullable: false,
			}),
			location: new fields.StringField({
				initial: "",
				nullable: false,
			}),
		};
	};
};
