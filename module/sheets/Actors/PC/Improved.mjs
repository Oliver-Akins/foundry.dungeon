import { GenericActorSheet } from "../../GenericActorSheet.mjs";
import DOTDUNGEON from "../../../config.mjs";
import { localizer } from "../../../utils/localizer.mjs";
import { modifierToString } from "../../../utils/modifierToString.mjs";

export class PlayerSheetv2 extends GenericActorSheet {
	static get defaultOptions() {
		let opts = mergeObject(
			super.defaultOptions,
			{
				template: `systems/dotdungeon/templates/actors/char-sheet/v2/sheet.hbs`,
				tabs: [
					{
						group: `page`,
						navSelector: `nav`,
						contentSelector: `.page-content`,
						initial: `stats`,
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
			stats: this.#statData,
		};
		console.log(ctx)
		return ctx;
	};

	get #statData() {
		const stats = [];
		const usedDice = new Set(Object.values(this.actor.system.stats));
		for (const statName in this.actor.system.stats) {
			const stat = {
				key: statName,
				name: localizer(`dotdungeon.stat.${statName}`),
				value: this.actor.system.stats[statName],
			};

			/*
			Determine what dice are available to the user in the dropdown
			selector. Disables all dice options that are selected, but not used
			by this stat.
			*/
			stat.dieOptions = [
				{ label: `---`, value: `` },
				...DOTDUNGEON.statDice.map(die => {
					return {
						value: die,
						label: localizer(`dotdungeon.die.${die}`, { stat: statName }),
						disabled: usedDice.has(die) && this.actor.system.stats[statName] !== die,
					};
				})
			];

			/*
			Calculating the data needed in order to display all of the skills
			for this character.
			*/
			stat.skills = [];
			for (const skill in this.actor.system.skills[statName]) {
				const value = this.actor.system.skills[statName][skill];
				stat.skills.push({
					key: skill,
					name: game.i18n.format(`dotdungeon.skills.${skill}`),
					value,
					formula: `1` + stat.value + modifierToString(value, { spaces: true }),
					rollDisabled: stat.value === `` || value === -1,
				});
			};

			stats.push(stat);
		};
		return stats;
	};

	_updateObject(...args) {
		console.log(args)
		super._updateObject(...args);
	};
}