import { schemaOptions } from "./schemaOptions.mjs";
import { createArray } from "./createArray.mjs";
import { detailsExpanded } from "./detailsExpanded.mjs";
import { objectValue } from "./objectValue.mjs";
import { toFriendlyDuration } from "./toFriendlyDuration.mjs";

export default {
	"dotdungeon-schemaOptions": schemaOptions,
	"dotdungeon-array": createArray,
	"dotdungeon-toFriendlyDuration": toFriendlyDuration,
	"dotdungeon-objectValue": objectValue,
	"dotdungeon-stringify": v => JSON.stringify(v, null, `  `),
	"dotdungeon-expanded": detailsExpanded,
};