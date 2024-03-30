/*
Initialization of dev-specific features for the init hook, this is primarily
used to register all of the data sheets of various entity types.
*/

import { UntypedDataSheet } from "../sheets/Datasheets/UntypedDataSheet.mjs";

export function devInit() {
	Items.registerSheet(
		`dotdungeon`,
		UntypedDataSheet,
		{
			types: [`untyped`, `foil`],
			label: `dotdungeon.sheet-names.UntypedDataSheet`,
		}
	);
};
