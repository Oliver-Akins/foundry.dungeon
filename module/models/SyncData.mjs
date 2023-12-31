export class SyncData extends foundry.abstract.DataModel {
	static defineSchema() {
		const fields = foundry.data.fields;
		return {
			value: new fields.NumberField({
				required: true,
				integer: true,
				initial: 100,
			}),
		};
	};
};