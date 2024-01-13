/** @this {Actor} */
async function genericEmbeddedUpdate($event) {
	let data = $event.delegateTarget.dataset;
	let item = await fromUuid(data.embeddedId);
	item?.update({ [data.embeddedUpdate]: $event.target.value });
	this.sheet.render();
};

/** @this {Actor} */
async function genericEmbeddedDelete($event) {
	let data = $event.currentTarget.dataset;
	let item = await fromUuid(data.embeddedId);

	if (!item) {
		ui.notifications.error(
			`dotdungeon.notification.error.item-not-found`,
			{ console: false }
		);
		return;
	};

	Dialog.confirm({
		title: game.i18n.format(
			`dotdungeon.dialogs.${item.type}.delete.title`,
			item
		),
		content: game.i18n.format(
			`dotdungeon.dialogs.${item.type}.delete.content`,
			item
		),
		yes: () => {
			item.delete();
		},
		defaultYes: false,
	});
};

/** @this {Actor} */
async function createCustomItem(defaults, opts = {}) {
	let items = await this.createEmbeddedDocuments(`Item`, defaults);
	if (items.length == 0) {
		throw new Error();
	};
	this.sheet.render();
	if (
		game.settings.get(`dotdungeon`, `openEmbeddedOnCreate`)
		&& !opts.overrideSheetOpen
	) {
		for (const item of items) {
			item.sheet.render(true);
		};
	};
};

/** @this {Actor} */
async function createCustomAspect() {
	await createCustomItem.bind(this)([{
		type: `aspect`,
		name: game.i18n.format(`dotdungeon.defaults.aspect.name`),
	}]);
};

/** @this {Actor} */
async function createCustomSpell() {
	await createCustomItem.bind(this)([{
		type: `spell`,
		name: game.i18n.format(`dotdungeon.defaults.spell.name`),
	}]);
};

export default {
	genericEmbeddedDelete,
	genericEmbeddedUpdate,
	createCustomItem,
	createCustomAspect,
	createCustomSpell
};