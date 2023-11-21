import ActorSheetPC from "./module/sheets/pc.mjs";

console.log(`.dungeon | hello from dotdungeon.mjs`)
Hooks.once(`init`, async () => {
	Actors.registerSheet("dotdungeon-pug", ActorSheetPC, {
		types: ["pc", "pug"],
		makeDefault: true,
		canBeDefault: true,
	});
})