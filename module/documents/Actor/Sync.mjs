import { DotDungeonActor } from "./GenericActor.mjs";

export class Sync extends DotDungeonActor {
	async useRestDie() {
		let addToSync = await (new Roll(syncDice)).evaluate();
		await addToSync.toMessage({
			speaker: ChatMessage.getSpeaker({ actor: this.actor }),
			flavor: `Sync Restoration`,
		});
		this.update({
			"system.rest_dice": this.system.rest_dice - 1,
			"system.value": this.system.value + addToSync.total,
		});
	};

	async _preUpdate(data, options) {
		if (options.diff) {
			if (data.system?.value != null) {
				let currentSync = this.system.value;
				let newSync = data.system.value;

				let minSync = Math.min(currentSync, newSync);
				let maxSync = Math.max(currentSync, newSync);
				let milestones = syncMilestones.filter(
					m => minSync < m.value && m.value <= maxSync
				);

				if (milestones.length > 0) data.system.rest_dice ??= this.system.rest_dice;

				for (const milestone of milestones) {
					// Damage
					if (newSync < currentSync) {
						if (!this.system.milestones_hit.has(milestone.value)) {
							data.system.rest_dice += 1;
							this.system.milestones_hit.add(milestone.value);
						};
					}

					// Healing
					else if (newSync > currentSync) {
						if (
							this.system.milestones_hit.has(milestone.value)
							&& milestone.andReturn
							&& milestone.value <= newSync
						) {
							this.system.milestones_hit.delete(milestone.value);
						};
					};
				};

				data.system.milestones_hit = [ ...this.system.milestones_hit ];
			};
		};
	};
};
