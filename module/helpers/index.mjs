import { schemaOptions } from "./schemaOptions.mjs";
import { createArray } from "./createArray.mjs";
import { detailsExpanded } from "./detailsExpanded.mjs";
import { objectValue } from "./objectValue.mjs";
import { toFriendlyDuration } from "./toFriendlyDuration.mjs";

export default {
	"dd-schemaOptions": schemaOptions,
	"dd-array": createArray,
	"dd-toFriendlyDuration": toFriendlyDuration,
	"dd-objectValue": objectValue,
	"dd-expanded": detailsExpanded,
	"dd-stringify": v => JSON.stringify(v, null, `  `),
	"dd-negate": v => !v,
};