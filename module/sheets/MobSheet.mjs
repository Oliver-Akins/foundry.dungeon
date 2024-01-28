import { ActorHandler } from "../documents/Actor/Handler.mjs";
import { GenericActorSheet } from "./GenericActorSheet.mjs";

export class MobSheet extends GenericActorSheet {
	static get defaultOptions() {
		let opts = mergeObject(
			super.defaultOptions,
			{
				template: `systems/dotdungeon/templates/actors/mobs/main.hbs`,
				width: 300,
				height: 360,
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
	};

	async getData() {
		const ctx = await super.getData();
		/** @type {ActorHandler} */
		const actor = this.actor;

		ctx.system = actor.system;
		ctx.flags = actor.flags;
		ctx.items = this.actor.itemTypes;

		ctx.computed = {};

		console.log(actor.uuid, `context:`, ctx)
		return ctx;
	};
};