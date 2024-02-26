import { GenericActorSheet } from "../../GenericActorSheet.mjs";

export class PlayerSheetv2 extends GenericActorSheet {
	static get defaultOptions() {
		let opts = mergeObject(
			super.defaultOptions,
			{
				template: `systems/dotdungeon/templates/actors/char-sheet/v2/sheet.hbs`,
				tabs: [
					{
						// group: `page`,
						navSelector: `.potato`,
						contentSelector: `.tab-content`,
						initial: `tab1`,
					},
				],
			}
		);
		opts.classes.push(`dotdungeon`);
		return opts;
	};

	activateListeners(html) {
		super.activateListeners(html);

		if (this.document.isEmbedded) return;
		if (!this.isEditable) return;
		console.debug(`.dungeon | Adding event listeners for Actor: ${this.id}`);
	};

	async getData() {
		const ctx = await super.getData();
		/** @type {ActorHandler} */
		const actor = this.actor;

		ctx.system = actor.system;
		ctx.flags = actor.flags;
		ctx.items = this.actor.itemTypes;

		ctx.computed = {
			canChangeGroup: ctx.settings.playersCanChangeGroup || ctx.isGM,
			canAddAspect: !await actor.proxyFunction.bind(actor)(`atAspectLimit`),
		};

		return ctx;
	};
}