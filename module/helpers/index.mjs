import { schemaOptions } from "./schemaOptions.mjs";
import { createArray } from "./createArray.mjs";
import { detailsExpanded } from "./detailsExpanded.mjs";
import { objectValue } from "./objectValue.mjs";
import { toFriendlyDuration } from "./toFriendlyDuration.mjs";

export default {

	// Complex helpers
	"dd-schemaOptions": schemaOptions,
	"dd-array": createArray,
	"dd-toFriendlyDuration": toFriendlyDuration,
	"dd-objectValue": objectValue,
	"dd-expanded": detailsExpanded,

	// Simple helpers
	"dd-stringify": v => JSON.stringify(v, null, `  `),
	"dd-empty": v => v.length == 0,

	// Logic helpers
	"eq": (a, b) => a == b,
	"neq": (a, b) => a != b,
	"not": v => !v,
	"or": (a, b) => a || b,
	"and": (a, b) => a && b,
	"nor": (a, b) => !(a || b),
	"nand": (a, b) => !(a && b),
	"xor": (a, b) => (a || b) && !(a && b),
	"xnor": (a, b) => !((a || b) && !(a && b)),
	"defined": v => v != null,
};
