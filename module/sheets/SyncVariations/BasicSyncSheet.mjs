import { AbstractSyncSheet } from "./AbstractSyncSheet.mjs";

export class BasicSyncSheet extends AbstractSyncSheet {
	get template() {
		return `systems/dotdungeon/templates/actors/sync/basic.hbs`;
	};
};
