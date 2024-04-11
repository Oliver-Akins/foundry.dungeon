/**
Attributes:
@property {string} name - The name of the icon, takes precedence over the path
@property {string} path - The path of the icon file
*/
export class DotDungeonIcon extends HTMLElement {
	static elementName = `dd-icon`;
	static formAssociated = false;

	static #styles = ``;
	_internals;
	_shadow;

	_min;
	_max;
	_smallStep;
	_largeStep;

	constructor() {
		super();
		this._shadow = this.attachShadow({ mode: `open`, delegatesFocus: true });
		if (DotDungeonIcon.#styles) this.#embedStyles();
	};


	connectedCallback() {
		this.replaceChildren();

		/*
		This converts all of the double-dash prefixed properties on the element to
		CSS variables so that they don't all need to be provided by doing style=""
		*/
		for (const attrVar of this.attributes) {
			if (attrVar.name?.startsWith(`--`)) {
				this.style.setProperty(attrVar.name, attrVar.value);
			};
		};

		/*
		Style fetching if we haven't gotten them yet
		*/
		if (!DotDungeonIcon.#styles) {
			fetch(`./systems/dotdungeon/.styles/v3/components/incrementer.css`)
			.then(r => r.text())
			.then(t => {
				DotDungeonIcon.#styles = t;
				this.#embedStyles();
			});
		};

		/*
		Try to retrieve the icon if it isn't present, try the path then default to
		the slot content, as then we can have a default per-icon usage
		*/
		let content;

		if (!content) {
			let slot = document.createElement(`slot`);
			content ??= slot;
		}
	};

	#embedStyles() {
		const style = document.createElement(`style`);
		style.innerHTML = DotDungeonIcon.#styles;
		this._shadow.appendChild(style);
	};
};
