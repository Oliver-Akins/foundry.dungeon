export class PlayerData extends foundry.abstract.DataModel {
	static defineSchema() {
		const fields = foundry.data.fields;
		return {
			stats: new fields.SchemaField({
				build: new fields.StringField({
					blank: true,
					trim: true,
					options(...args) {
						console.log(`build args`, args);
						return [ `d4`, `d6`, `d8`, `d10`, `d12`, `d20` ];
					},
				}),
				meta: new fields.StringField({
					blank: true,
					trim: true,
					options(...args) {
						console.log(args);
						return [ `d4`, `d6`, `d8`, `d10`, `d12`, `d20` ];
					},
				}),
				presence: new fields.StringField({
					blank: true,
					trim: true,
					options(...args) {
						console.log(args);
						return [ `d4`, `d6`, `d8`, `d10`, `d12`, `d20` ];
					},
				}),
				hands: new fields.StringField({
					blank: true,
					trim: true,
					options(...args) {
						console.log(args);
						return [ `d4`, `d6`, `d8`, `d10`, `d12`, `d20` ];
					},
				}),
				tilt: new fields.StringField({
					blank: true,
					trim: true,
					options(...args) {
						console.log(args);
						return [ `d4`, `d6`, `d8`, `d10`, `d12`, `d20` ];
					},
				}),
				rng: new fields.StringField({
					blank: true,
					trim: true,
					options(...args) {
						console.log(args);
						return [ `d4`, `d6`, `d8`, `d10`, `d12`, `d20` ];
					},
				}),
			}),
		};
	};
};