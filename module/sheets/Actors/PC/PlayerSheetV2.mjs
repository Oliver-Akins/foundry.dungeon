import { GenericActorSheet } from "../../GenericActorSheet.mjs";
import DOTDUNGEON from "../../../config.mjs";
import { localizer } from "../../../utils/localizer.mjs";
import { modifierToString } from "../../../utils/modifierToString.mjs";
import { Player } from "../../../documents/Actor/Player.mjs";

export class PlayerSheetv2 extends GenericActorSheet {

	/** @type {Player | null} */
	actor;

	static get defaultOptions() {
		let opts = mergeObject(
			super.defaultOptions,
			{
				template: `systems/dotdungeon/templates/actors/char-sheet/v2/sheet.hbs`,
				tabs: [
					{
						group: `page`,
						navSelector: `nav.page`,
						contentSelector: `.page-content`,
						initial: `inventory`,
					},
					{
						group: `inventory`,
						navSelector: `nav.inventory`,
						contentSelector: `.tab[data-tab="inventory"]`,
						initial: `player`,
					}
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

		html.find(`.create-ae`).on(`click`, async ($e) => {
			console.debug(`Creating an ActiveEffect?`);
			ActiveEffect.implementation.create({
				name: "Default AE",
			}, { parent: this.actor, renderSheet: true });
		});
		html.find(`[data-filter-toggle]`).on(`change`, ($e) => {
			const target = $e.delegateTarget;
			const filter = target.dataset.filterToggle;
			this.toggleItemFilter(filter);
			this._renderInner();
		});
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
			canAddAspect: !this.actor.atAspectLimit,
			stats: this.#statData,
			itemFilters: this.#itemFilters,
			noItemTypesVisible: this._itemTypesHidden.size === DOTDUNGEON.itemFilters.length,
			capacity: this.#inventoryCapacity,
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
					rollDisabled: value === -1,
				});
			};

			stats.push(stat);
		};
		return stats;
	};

	_itemTypesHidden = new Set([`weapon`, `armour`, `equipment`, `foil`, `structure`, `service`]);
	toggleItemFilter(filterName) {
		if (this._itemTypesHidden.has(filterName)) {
			this._itemTypesHidden.delete(filterName);
		} else {
			this._itemTypesHidden.add(filterName);
		};
		this.render();
	};

	get #itemFilters() {
		const types = DOTDUNGEON.itemFilters;
		const filters = {};
		for (const type of types) {
			filters[type] = {
				label: localizer(`TYPES.Item.${type}`),
				active: !this._itemTypesHidden.has(type),
			};
		};
		return filters;
	};

	get #inventoryCapacity() {
		return {
			used: this.actor.items
				.reduce((sum, i) => sum + i.system.uses_inventory_slot ? i.system.quantity : 0, 0),
			max: this.actor.system.inventory_slots,
		};
	};

	_updateObject(...args) {
		console.log(args)
		super._updateObject(...args);
	};
}