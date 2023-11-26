/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */
export class CharacterSheet extends ActorSheet {
	static get defaultOptions() {
		let opts = mergeObject(
			super.defaultOptions,
			{
				template: "systems/dotdungeon/templates/actors/char-sheet-mvp/sheet.hbs"
			}
		);
		opts.classes.push("dotdungeon");
		return opts;
	};

	activateListeners(html) {
		super.activateListeners(html);

		if (!this.isEditable) return;
		console.debug(`.dungeon | Adding event listeners for Actor${this.id}`)

		// Modal openings
		html.find(`button.stat-prompt`).on("click", () => {});
	}
}