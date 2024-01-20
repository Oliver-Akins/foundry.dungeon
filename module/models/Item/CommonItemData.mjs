import DOTDUNGEON from "../../config.mjs";

export class CommonItemData extends foundry.abstract.TypeDataModel {
	static defineSchema() {
		const fields = foundry.data.fields;
		return {
			buy: new fields.NumberField({
				initial: null,
				nullable: true,
			}),
			usage_cost: new fields.NumberField({
				initial: null,
				nullable: true,
			}),
			tier: new fields.StringField({
				initial: `simple`,
				nullable: false,
				choices: DOTDUNGEON.itemTiers,
			}),
		};
	};
};
