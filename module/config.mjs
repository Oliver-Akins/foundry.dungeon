export const statDice = [ `d4`, `d6`, `d8`, `d10`, `d12`, `d20` ];

export const trainingLevels = [``, `locked`, `+2`, `+4`];

export const damageTypes = [ `slashing`, `piercing`, `smashing`, `gun`, `neon`, `shadow`, `solar` ];

export const ammoTypes = [`quivers`, `mags`, `cells`];

export const stats = [ `build`, `meta`, `presence`, `hands`, `tilt`, `rng` ];

export const buildSkills = [ `defense`, `magic`, `melee`, `platforming`, `strength`, ];
export const metaSkills = [ `alchemy`, `arcanum`, `dreams`, `lore`, `navigation`, ];
export const presenceSkills = [ `animal_handling`, `perception`, `sneak`, `speech`, `vibes`, ];
export const handsSkills = [ `accuracy`, `crafting`, `engineering`, `explosives`, `piloting`, ];

export const allSkills = [
	...buildSkills,
	...metaSkills,
	...presenceSkills,
	...handsSkills,
];

export const skills = {
	build: buildSkills,
	meta: metaSkills,
	presence: presenceSkills,
	hands: handsSkills,
};

export const itemTiers = [
	`simple`, `greater`,
	`rare`, `legendary`
];

export const syncMilestones = [
	{ value: 20, andReturn: true },
	{ value: 40, andReturn: false },
	{ value: 60, andReturn: true },
	{ value: 80, andReturn: false },
	{ value: 100, andReturn: true },
];

export const syncDice = `1d20`;

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
	itemTiers,
	syncMilestones,
	syncDice,
};
