function diceChoiceField() {
	return new foundry.data.fields.StringField({
		blank: true,
		trim: true,
		options() {
			return [ `d4`, `d6`, `d8`, `d10`, `d12`, `d20` ];
		},
	});
};

function trainingLevelField() {
	return new foundry.data.fields.StringField({
		blank: true,
		trim: true,
		options: [ ``, `locked`, `+2`, `+4` ],
	});
};

export class PlayerData extends foundry.abstract.DataModel {
	static defineSchema() {
		const fields = foundry.data.fields;
		return {
			bytes: new fields.NumberField({
				integer: true,
				positive: true,
			}),
			stats: new fields.SchemaField({
				build: diceChoiceField(),
				meta: diceChoiceField(),
				presence: diceChoiceField(),
				hands: diceChoiceField(),
				tilt: diceChoiceField(),
				rng: diceChoiceField(),
			}),
			skills: new fields.SchemaField({
				build: new fields.SchemaField({
					defense: trainingLevelField(),
					magic: trainingLevelField(),
					melee: trainingLevelField(),
					platforming: trainingLevelField(),
					strength: trainingLevelField(),
				}),
				meta: new fields.SchemaField({
					alchemy: trainingLevelField(),
					arcanum: trainingLevelField(),
					dreams: trainingLevelField(),
					lore: trainingLevelField(),
					navigation: trainingLevelField(),
				}),
				presence: new fields.SchemaField({
					animal_handling: trainingLevelField(),
					perception: trainingLevelField(),
					sneak: trainingLevelField(),
					speech: trainingLevelField(),
					vibes: trainingLevelField(),
				}),
				hands: new fields.SchemaField({
					accuracy: trainingLevelField(),
					crafting: trainingLevelField(),
					engineering: trainingLevelField(),
					explosives: trainingLevelField(),
					piloting: trainingLevelField(),
				})
			}),
			aspect: new fields.SchemaField({
				name: new fields.StringField({ blank: true, trim: true }),
				description: new fields.StringField({ blank: true, trim: true }),
				deactivateAfter: new fields.NumberField({ min: 0, integer: true}),
				used: new fields.BooleanField(),
			}),
			roles: new fields.ArrayField(new fields.HTMLField()),
			weapon: new fields.SchemaField({
				name: new fields.HTMLField(),
				damage: new fields.HTMLField(),
				ammo: new fields.SchemaField({
					quivers: new fields.NumberField({ min: 0, max: 5, integer: true }),
					mags: new fields.NumberField({ min: 0, max: 5, integer: true }),
					cells: new fields.NumberField({ min: 0, max: 5, integer: true }),
				}),
			}),
			supplies: new fields.NumberField({
				initial: 0,
				min: 0,
				max: 5,
				integer: true
			}),
			materials: new fields.NumberField({
				initial: 0,
				min: 0,
				max: 5,
				integer: true
			}),
			pet: new fields.SchemaField({
				name: new fields.HTMLField(),
				info: new fields.HTMLField(),
			}),
			transport: new fields.SchemaField({
				name: new fields.HTMLField(),
				upkeep: new fields.NumberField({ min: 0, integer: true }),
				info: new fields.HTMLField(),
			}),
			spells: new fields.ArrayField(
				new fields.SchemaField({
					name: new fields.HTMLField(),
					cost: new fields.NumberField(),
					info: new fields.HTMLField(),
				})
			),
			respawns: new fields.SchemaField({
				r1: new fields.BooleanField(),
				r2: new fields.BooleanField(),
				r3: new fields.BooleanField(),
			}),
			syncDelta: new fields.NumberField({
				required: true,
				integer: true,
				initial: 0,
			}),
		};
	};
};