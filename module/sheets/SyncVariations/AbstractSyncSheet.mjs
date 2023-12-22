import { GenericSheet } from "../GenericSheet.mjs";

export class AbstractSyncSheet extends GenericSheet {
	static get defaultOptions() {
		let opts = mergeObject(
			super.defaultOptions,
			{
				width: 200,
				height: 200,
			}
		);
		opts.classes.push(
			`dotdungeon`,
			`dotdungeon--sync-sheet`
		);
		return opts;
	};

	getData() {
		const ctx = super.getData();
		const actor = this.actor.toObject(false);

		ctx.system = actor.system;
		ctx.flags = actor.flags;

		console.groupCollapsed(`SyncSheet.getData`);
		console.log(`ctx`, ctx);
		console.log(`actor`, actor);
		console.groupEnd();
		return ctx;
	};
};