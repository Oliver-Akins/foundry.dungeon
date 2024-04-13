import { DotDungeonIncrementer } from "./incrementer.mjs";
import { DotDungeonIcon } from "./icon.mjs";

const components = [
	DotDungeonIcon,
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
