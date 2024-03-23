export class DotDungeonItem extends Item {
	async _preCreate(...args) {
		if (this.isEmbedded) {
			return await this.actor?.preItemEmbed(...args);
		};
	};

	get usedCapacity() {
		let capacity = 0;
		if (this.system.uses_inventory_slot && this.system.quantity > 0) {
			capacity = 1;
		};
		if (this.system.quantity_affects_used_capacity) {
			capacity = this.system.quantity;
		};
		return capacity;
	};
};
