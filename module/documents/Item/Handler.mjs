import AspectItem from "./Aspect.mjs";

/**
 * @extends {Item}
 */
export class ItemHandler extends Item {
	/** @override */

	itemTypes = {
		aspect: AspectItem,
	};

	constructor(data, ctx) {
		super(data, ctx);
	};

	/** @type {class|undefined} */
	get fn() {
		return this.itemTypes[this.type];
	};

	async _preCreate(...args) {
		if (!this.fn?._preCreate) return;
		return this.fn?._preCreate.bind(this)(...args);
	};
};
