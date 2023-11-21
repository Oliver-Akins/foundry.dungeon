/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */
export class ActorSheetPC extends ActorSheet {
	static get defaultOptions() {
		return mergeObject(
			super.defaultOptions,
			{
				classes: ["dotdungeon", "sheet", "actor"],
				template: "systems/dotdungeon/templates/actors/character-sheet-mvp.hbs"
			}
		);
	};
}