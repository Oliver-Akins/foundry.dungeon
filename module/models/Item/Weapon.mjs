import { DescribedItemData } from "./DescribedItemData.mjs";
import DOTDUNGEON from "../../config.mjs";

export class WeaponItemData extends DescribedItemData {
	static defineSchema() {
		const fields = foundry.data.fields;
		return mergeObject(super.defineSchema(), {
			damage: new fields.StringField({
				initial: null,
				nullable: true,
				blank: true,
				options: DOTDUNGEON.damageTypes,
			}),
			ranged: new fields.BooleanField({ initial: false, }),
			scoped: new fields.BooleanField({ initial: false, }),
			ammo: new fields.StringField({
				initial: null,
				nullable: true,
				blank: true,
				options: DOTDUNGEON.ammoTypes,
			}),
		});
	};
};
