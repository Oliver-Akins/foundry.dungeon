import AspectItem from "./Aspect.mjs";
import SpellItem from "./Spell.mjs";

/** @extends {Item} */
export class ItemHandler extends Item {
	proxyTargets = {
		aspect: AspectItem,
		spell: SpellItem,
	};

	constructor(data, ctx) {
		super(data, ctx);
	};

	/** @type {class|undefined} */
	get fn() {
		return this.proxyTargets[this.type];
	};

	async proxyFunction(funcName, ...args) {
		if (!this.fn?.[funcName]) return;
		return await this.fn?.[funcName].bind(this)(...args);
	};

	async _preCreate(...args) {
		if (this.fn?._preCreate) return this.fn?._preCreate.bind(this)(...args);
		if (this.isEmbedded) return await this.actor?.preItemEmbed(this);
		return;
	};
};
