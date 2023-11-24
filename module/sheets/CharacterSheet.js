/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */
export class CharacterSheet extends ActorSheet {
	static get defaultOptions() {
		return mergeObject(
			super.defaultOptions,
			{
				classes: ["dotdungeon", "sheet", "actor"],
				template: "systems/dotdungeon/templates/actors/char-sheet-mvp/sheet.hbs"
			}
		);
	};

	activateListeners(html) {
		super.activateListeners(html);

		if (!this.isEditable) return;
		console.debug(`.dungeon | Adding event listeners for Actor${this.id}`)

		// Modal openings
		html.find(`button.stat-prompt`).on("click", () => {});
	}
}