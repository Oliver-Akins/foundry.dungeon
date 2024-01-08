const statDice = [ `d4`, `d6`, `d8`, `d10`, `d12`, `d20` ];

const trainingLevels = [``, `locked`, `+2`, `+4`];

const damageTypes = [ `slashing`, `piercing`, `smashing`, `gun`, `neon`, `shadow`, `solar` ];

const ammoTypes = [`quivers`, `mags`, `cells`];

const skills = {
	build: [ "defense", "magic", "melee", "platforming", "strength", ],
	meta: [ "alchemy", "arcanum", "dreams", "lore", "navigation", ],
	presence: [ "animal_handling", "perception", "sneak", "speech", "vibes", ],
	hands: [ "accuracy", "crafting", "engineering", "explosives", "piloting", ]
};

export default {
	statDice,
	trainingLevels,
	damageTypes,
	ammoTypes,
	skills,
};