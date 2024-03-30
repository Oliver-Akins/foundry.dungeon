export class UntypedDataSheet extends ItemSheet {
	static get defaultOptions() {
		let opts = foundry.utils.mergeObject(
			super.defaultOptions,
			{
				template: `systems/dotdungeon/templates/datasheets/untyped.hbs`,
				width: 650,
				height: 700
			},
		);
		opts.classes.push(`dotdungeon`, `style-v3`);
		return opts;
	};

	async getData() {
		const ctx = {};

		ctx.item = this.item;
		ctx.system = this.item.system;

		ctx.meta = {
			idp: this.item.uuid,
		};

		return ctx;
	};
};
