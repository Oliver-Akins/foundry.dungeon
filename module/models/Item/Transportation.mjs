import { DescribedItemData } from "./DescribedItemData.mjs";

export class TransportationItemData extends DescribedItemData {
	static defineSchema() {
		const fields = foundry.data.fields;
		return mergeObject(super.defineSchema(), {
			single_trip: new fields.NumberField({
				initial: null,
				nullable: true,
			}),
			purchase: new fields.NumberField({
				initial: null,
				nullable: true,
			}),
			upkeep: new fields.NumberField({
				initial: null,
				nullable: true,
			}),
			can_be_in_inventory: new fields.BooleanField({
				initial: false,
			}),
			inventory_slots: new fields.NumberField({
				initial: 0,
				min: 0,
			}),
			logon_bonus: new fields.NumberField({
				initial: null,
				nullable: true,
			})
		});
	};
};
