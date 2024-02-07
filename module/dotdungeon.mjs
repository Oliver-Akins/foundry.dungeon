// Data Models
import { DescribedItemData } from "./models/Item/DescribedItemData.mjs";
import { AspectItemData } from "./models/Item/Aspect.mjs";
import { SpellItemData } from "./models/Item/Spell.mjs";
import { PlayerData } from "./models/Actor/Player.mjs";
import { PetItemData } from "./models/Item/Pet.mjs";
import { SyncData } from "./models/Actor/Sync.mjs";
import { MobData } from "./models/Actor/Mob.mjs";

// Main Documents
import { ActorHandler } from "./documents/Actor/Handler.mjs";
import { ItemHandler } from "./documents/Item/Handler.mjs";

// Item Sheets
import { UntypedItemSheet } from "./sheets/Items/UntypedItemSheet.mjs";
import { AspectSheet } from "./sheets/Items/AspectSheet.mjs";
import { SpellSheet } from "./sheets/Items/SpellSheet.mjs";
import { PetSheet } from "./sheets/Items/PetSheet.mjs";

// Actor Sheets
import { BasicSyncSheet } from "./sheets/SyncVariations/BasicSyncSheet.mjs";
import { PlayerSheet } from "./sheets/PlayerSheet.mjs";
import { MobSheet } from "./sheets/MobSheet.mjs";

// Utility imports
import * as hbs from "./handlebars.mjs";

// Non-Setup hooks
import "./hooks/hotReload.mjs";

// Misc Imports
import loadSettings from "./settings/index.mjs";
import DOTDUNGEON from "./config.mjs";


Hooks.once(`init`, async () => {
	console.debug(`.dungeon | Initializing`);

	loadSettings();

	CONFIG.Actor.dataModels.player = PlayerData;
	CONFIG.Actor.dataModels.sync = SyncData;
	CONFIG.Actor.dataModels.mob = MobData;
	CONFIG.Item.dataModels.untyped = DescribedItemData;
	CONFIG.Item.dataModels.aspect = AspectItemData;
	CONFIG.Item.dataModels.spell = SpellItemData;
	CONFIG.Item.dataModels.pet = PetItemData;
	CONFIG.Actor.documentClass = ActorHandler;
	CONFIG.Item.documentClass = ItemHandler;

	CONFIG.DOTDUNGEON = DOTDUNGEON;


	Actors.registerSheet("dotdungeon", PlayerSheet, {
		makeDefault: true,
		types: ["player"],
		label: "dotdungeon.sheet-names.PlayerSheet"
	});
	Actors.registerSheet("dotdungeon", MobSheet, {
		makeDefault: true,
		types: ["mob"],
		label: "dotdungeon.sheet-names.MobSheet"
	});
	Actors.registerSheet("dotdungeon", BasicSyncSheet, {
		makeDefault: true,
		types: ["sync"],
		label: "dotdungeon.sheet-names.SyncSheet.basic"
	});

	Items.registerSheet("dotdungeon", UntypedItemSheet, {
		makeDefault: true,
		label: "dotdungeon.sheet-names.UntypedItemSheet",
	});
	Items.unregisterSheet("dotdungeon", UntypedItemSheet, {
		types: ["aspect"],
	});
	Items.registerSheet("dotdungeon", AspectSheet, {
		makeDefault: true,
		types: ["aspect"],
		label: "dotdungeon.sheet-names.AspectSheet"
	});
	Items.registerSheet("dotdungeon", SpellSheet, {
		makeDefault: true,
		types: ["spell"],
		label: "dotdungeon.sheet-names.SpellSheet"
	});
	Items.registerSheet("dotdungeon", PetSheet, {
		makeDefault: true,
		types: ["pet"],
		label: "dotdungeon.sheet-names.PetSheet"
	});


	hbs.registerHandlebarsHelpers();
	hbs.preloadHandlebarsTemplates();

	CONFIG.CACHE = {};
	CONFIG.CACHE.icons = await hbs.preloadIcons();
});


Hooks.once(`ready`, () => {
	console.debug(".dungeon | Ready");

	let defaultTab = game.settings.get(`dotdungeon`, `defaultTab`);
	if (defaultTab) {
		if (!ui.sidebar?.tabs?.[defaultTab]) {
			console.error(`Couldn't find a sidebar tab with ID:`, defaultTab);
		} else {
			console.debug(`Switching sidebar tab to:`, defaultTab);
			ui.sidebar.tabs[defaultTab].activate();
		};
	};
});