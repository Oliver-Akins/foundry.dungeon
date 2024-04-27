import DOTDUNGEON from "../../config.mjs";
import { DiceField } from "../fields/DiceField.mjs";

function diceChoiceField() {
	return new foundry.data.fields.StringField({
		initial: ``,
		blank: true,
		trim: true,
		options() {
			return DOTDUNGEON.statDice;
		},
	});
};

function trainingLevelField() {
	return new foundry.data.fields.NumberField({
		initial: 0,
		min: -1,
		integer: true,
		options: Object.values(DOTDUNGEON.trainingLevels),
	});
};

export class PlayerData extends foundry.abstract.TypeDataModel {
	static defineSchema() {
		const fields = foundry.data.fields;
		return {
			/*
			These are special data properties that will be used by ActiveEffects
			to modify certain limits within the actor, allowing for neat hacks
			that change these
			*/
			weapon_slots: new fields.NumberField({ initial: 2 }),
			inventory_slots: new fields.NumberField({ initial: 0 }),

			bytes: new fields.NumberField({
				initial: 0,
				min: 0,
				integer: true,
			}),
			stats: new fields.SchemaField({
				build: new DiceField(),
				meta: new DiceField(),
				presence: new DiceField(),
				hands: new DiceField(),
				tilt: new DiceField(),
				rng: new DiceField(),
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
			// ! Delete
			roles: new fields.SchemaField({
				r1: new fields.StringField({ blank: true, trim: true }),
				r2: new fields.StringField({ blank: true, trim: true }),
				r3: new fields.StringField({ blank: true, trim: true }),
				r4: new fields.StringField({ blank: true, trim: true }),
			}),
			supplies: new fields.NumberField({
				initial: 0,
				min: 0,
				integer: true
			}),
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
