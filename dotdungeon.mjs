Hooks.once(`init`, () => {
	Actors.unregisterSheet("core", ActorSheet);
	Actors.registerSheet("dotdungeon", applications.actor.ActorSheet5eCharacter, {
		types: ["pc", "pug"],
		makeDefault: true,
		label: "DND5E.SheetClassCharacter"
	});
})