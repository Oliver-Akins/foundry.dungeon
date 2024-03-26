export class GenericContextMenu extends ContextMenu {
	constructor(element, selector, menuItems, opts = {}) {
		super(element, selector, menuItems, opts);
		this.menuItems.forEach(i => i.icon ??= ``);
	};
};
