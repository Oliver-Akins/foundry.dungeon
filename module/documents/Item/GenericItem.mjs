export class DotDungeonItem extends Item {
	async _preCreate() {
		if (this.isEmbedded) {
			return await this.actor?.preItemEmbed(this);
		};
	};

	get usedCapacity() {
		if (!this.system.uses_inventory_slot) return 0;
		if (!this.system.quantity_affects_used_capacity) {
			return 1;
		};
		return this.system.quantity;
	};
};
