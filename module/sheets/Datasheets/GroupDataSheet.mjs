export class GroupDataSheet extends ActorSheet {
	static get defaultOptions() {
		let opts = foundry.utils.mergeObject(
			super.defaultOptions,
			{
				template: `systems/dotdungeon/templates/datasheets/actor/group.hbs`,
				width: 200,
				height: 275
			},
		);
		opts.classes.push(`dotdungeon`, `style-v3`);
		return opts;
	};

	async getData() {
		const ctx = {};

		ctx.actor = this.actor;
		ctx.system = this.actor.system;

		ctx.computed = {
			milestones_hit_viewable: [...this.actor.system.milestones_hit.values()].join(`, `)
		}

		ctx.meta = {
			idp: this.actor.uuid,
		};

		return ctx;
	};
};
