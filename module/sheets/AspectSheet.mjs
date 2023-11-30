export class AspectSheet extends ItemSheet {
	static get defaultOptions() {
		let opts = mergeObject(
			super.defaultOptions,
			{
				template: `systems/dotdungeon/templates/items/aspect.hbs`,
				width: 280,
				height: 340,
			}
		);
		opts.classes.push(`dotdungeon`);
		return opts;
	};

	getData() {
		const ctx = super.getData();
		const item = this.item.toObject(false);

		ctx.system = item.system;
		ctx.flags = item.flags;

		console.groupCollapsed(`AspectSheet.getData`);
		console.log(`ctx`, ctx);
		console.log(`item`, item);
		console.groupEnd();
		return ctx;
	};
};