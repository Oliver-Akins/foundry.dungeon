import { DotDungeonIncrementer } from "./incrementer.mjs";

const components = [
	DotDungeonIncrementer,
];

export function registerCustomComponents() {
	(CONFIG.CACHE ??= {}).componentListeners ??= [];
	for (const component of components) {
		if (!window.customElements.get(component.elementName)) {
			console.debug(`.dungeon | Registering component "${component.elementName}"`);
			window.customElements.define(
				component.elementName,
				component
			);
			if (component.formAssociated) {
				CONFIG.CACHE.componentListeners.push(component.elementName);
			}
		};
	}
};
