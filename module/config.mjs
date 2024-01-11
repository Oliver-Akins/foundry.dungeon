const statDice = [ `d4`, `d6`, `d8`, `d10`, `d12`, `d20` ];

const trainingLevels = [``, `locked`, `+2`, `+4`];

const damageTypes = [ `slashing`, `piercing`, `smashing`, `gun`, `neon`, `shadow`, `solar` ];

const ammoTypes = [`quivers`, `mags`, `cells`];

const stats = [ `build`, `meta`, `presence`, `hands`, `tilt`, `rng` ];

const buildSkills = [ "defense", "magic", "melee", "platforming", "strength", ];
const metaSkills = [ "alchemy", "arcanum", "dreams", "lore", "navigation", ];
const presenceSkills = [ "animal_handling", "perception", "sneak", "speech", "vibes", ];
const handsSkills = [ "accuracy", "crafting", "engineering", "explosives", "piloting", ];

const allSkills = [
	...buildSkills,
	...metaSkills,
	...presenceSkills,
	...handsSkills,
];

const skills = {
	build: buildSkills,
	meta: metaSkills,
	presence: presenceSkills,
	hands: handsSkills,
};

export default {
	stats,
	statDice,
	trainingLevels,
	damageTypes,
	ammoTypes,
	buildSkills,
	metaSkills,
	presenceSkills,
	handsSkills,
	allSkills,
	skills,
};