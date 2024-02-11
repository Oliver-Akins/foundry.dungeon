export class AspectItemData extends foundry.abstract.TypeDataModel {
	static defineSchema() {
		const fields = foundry.data.fields;
		return {
			used: new fields.BooleanField({ initial: false }),
			/** The number of seconds that the effect of the aspect stays */
			deactivateAfter: new fields.NumberField({ nullable: true }),
			info: new fields.HTMLField({ nullable: true, blank: false, trim: true }),
		};
	};
};
