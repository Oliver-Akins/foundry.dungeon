import { MappingField } from "./fields/MappingField.mjs";

function diceChoiceField() {
	return new foundry.data.fields.StringField({
		initial: ``,
		blank: true,
		trim: true,
		options() {
			return CONFIG.DOTDUNGEON.statDice;
		},
	});
};

function trainingLevelField() {
	return new foundry.data.fields.StringField({
		initial: ``,
		blank: true,
		trim: true,
		options: CONFIG.DOTDUNGEON.trainingLevels,
	});
};

function weaponDamageTypeField() {
	return new foundry.data.fields.StringField({
		initial: ``,
		blank: true,
		options: [ ``, ...CONFIG.DOTDUNGEON.damageTypes ],
	});
};

function ammoTypeField() {
	return new foundry.data.fields.StringField({
		initial: ``,
		blank: true,
		options: [ ``, ...CONFIG.DOTDUNGEON.ammoTypes ],
	});
};

export class PlayerData extends foundry.abstract.DataModel {
	static defineSchema() {
		const fields = foundry.data.fields;
		return {
			bytes: new fields.NumberField({
				initial: 0,
				min: 0,
				integer: true,
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
			roles: new fields.SchemaField({
				r1: new fields.StringField({ blank: true, trim: true }),
				r2: new fields.StringField({ blank: true, trim: true }),
				r3: new fields.StringField({ blank: true, trim: true }),
				r4: new fields.StringField({ blank: true, trim: true }),
			}),
			weapon: new fields.SchemaField({
				mainHand: new fields.SchemaField({
					name: new fields.StringField({ blank: true, trim: true }),
					damage: weaponDamageTypeField(),
					ranged: new fields.BooleanField({ initial: false }),
					scope: new fields.BooleanField({ initial: false }),
					ammo: ammoTypeField(),
				}),
				offHand: new fields.SchemaField({
					name: new fields.StringField({ blank: true, trim: true }),
					damage: weaponDamageTypeField(),
					ranged: new fields.BooleanField({ initial: false }),
					scope: new fields.BooleanField({ initial: false }),
					ammo: ammoTypeField(),
				}),
				ammo: new fields.SchemaField({
					quivers: new fields.NumberField({ min: 0, max: 10, integer: true }),
					mags: new fields.NumberField({ min: 0, max: 10, integer: true }),
					cells: new fields.NumberField({ min: 0, max: 10, integer: true }),
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
				name: new fields.StringField(),
				info: new fields.StringField(),
			}),
			transport: new fields.SchemaField({
				name: new fields.StringField(),
				upkeep: new fields.NumberField({ min: 0, integer: true }),
				info: new fields.StringField(),
			}),
			spells: new MappingField(
				new fields.SchemaField({
					name: new fields.StringField({ initial: ``, blank: true, trim: true }),
					cost: new fields.NumberField({ initial: 0, min: 0 }),
					info: new fields.StringField({ initial: ``, blank: true, trim: true }),
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
			inventoryString: new fields.StringField({ blank: true, trim: true }),
		};
	};
};