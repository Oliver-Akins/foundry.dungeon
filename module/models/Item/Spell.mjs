import { DescribedItemData } from "./DescribedItemData.mjs";
import DOTDUNGEON from "../../config.mjs";

export class SpellItemData extends DescribedItemData {
	static defineSchema() {
		const fields = foundry.data.fields;
		return mergeObject(super.defineSchema(), {
			skill: new fields.StringField({
				initial: ``,
				blank: true,
				trim: true,
				options() {
					return [
						``,
						...DOTDUNGEON.allSkills
					];
				},
			}),
		});
	};
};