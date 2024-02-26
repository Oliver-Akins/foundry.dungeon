import { ActorHandler } from "../documents/Actor/Handler.mjs";
import { GenericActorSheet } from "./GenericActorSheet.mjs";
import { DiceList } from "../dialogs/DiceList.mjs";
import { PopoutTextEditor } from "../dialogs/PopoutTextEditor.mjs";

export class MobSheet extends GenericActorSheet {
	static get defaultOptions() {
		let opts = mergeObject(
			super.defaultOptions,
			{
				template: `systems/dotdungeon/templates/actors/mobs/main.hbs`,
				width: 750,
				height: 390,
			}
		);
		opts.classes.push(`dotdungeon`);
		return opts;
	};

	activateListeners(html) {
		super.activateListeners(html);

		if (this.document.isEmbedded) return;
		if (!this.isEditable) return;
		console.debug(`.dungeon | Adding event listeners for Mob: ${this.id}`);

		html.find(`.edit-dice`)
			.on(`click`, async () => {
				let d = new DiceList(this.actor);
				d.render(true);
			});
		html.find(`[data-text-editor]`)
			.on(`click`, () => {
				let editor = new PopoutTextEditor(
					this.actor,
					`system.description`
				);
				editor.render(true);
			});
	};

	async getData() {
		const ctx = await super.getData();
		/** @type {ActorHandler} */
		const actor = this.actor;

		ctx.system = actor.system;
		ctx.flags = actor.flags;
		ctx.items = this.actor.itemTypes;

		ctx.computed = {};

		// Compute rolls here

		return ctx;
	};
};
