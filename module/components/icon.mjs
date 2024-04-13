/**
Attributes:
@property {string} name - The name of the icon, takes precedence over the path
@property {string} path - The path of the icon file
*/
export class DotDungeonIcon extends HTMLElement {
	static elementName = `dd-icon`;
	static formAssociated = false;

	#shadow;

	static #styles = ``;
	static _cache = new Map();
	#style;
	#container;
	/** @type {null | string} */
	_name;
	/** @type {null | string} */
	_path;

	constructor() {
		super();
		this.#shadow = this.attachShadow({ mode: `open`, delegatesFocus: true });
		if (DotDungeonIcon.#styles) this.#embedStyles();

		this.#container = document.createElement(`div`);
		this.#shadow.appendChild(this.#container);
	};

	_mounted = false;
	async connectedCallback() {
		if (this._mounted) return;

		this._name = this.getAttribute(`name`);
		this._path = this.getAttribute(`path`);

		/*
		This converts all of the double-dash prefixed properties on the element to
		CSS variables so that they don't all need to be provided by doing style=""
		*/
		for (const attrVar of this.attributes) {
			if (attrVar.name?.startsWith(`var:`)) {
				const prop = attrVar.name.replace(`var:`, ``);
				this.style.setProperty(`--` + prop, attrVar.value);
			};
		};

		/*
		Style fetching if we haven't gotten them yet
		*/
		if (!DotDungeonIcon.#styles) {
			fetch(`./systems/dotdungeon/.styles/v3/components/icon.css`)
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
		if (this._name) {
			content = await this.#getIcon(`./systems/dotdungeon/assets/${this._name}.svg`);
		};

		if (this._path && !content) {
			content = await this.#getIcon(this._path);
		};

		if (content) {
			this.#container.appendChild(content.cloneNode(true));
		};

		/*
		This is so that when we get an HMR event from Foundry we can appropriately
		handle it using our logic to update the component and the icon cache.
		*/
		Hooks.on(`dd-hmr:svg`, (iconName, data) => {
			if (this._name === iconName || this._path?.endsWith(data.path)) {
				const svg = this.#parseSVG(data.content);
				DotDungeonIcon._cache.set(iconName, svg);
				this.#container.replaceChildren(svg.cloneNode(true));
			};
		});

		this._mounted = true;
	};

	#embedStyles() {
		this.#style = document.createElement(`style`);
		this.#style.innerHTML = DotDungeonIcon.#styles;
		this.#shadow.appendChild(this.#style);
	};

	async #getIcon(path) {
		// Cache hit!
		if (DotDungeonIcon._cache.has(path)) {
			console.debug(`.dungeon | Icon ${path} cache hit`);
			return DotDungeonIcon._cache.get(path);
		};

		const r = await fetch(path);
		switch (r.status) {
			case 200:
			case 201:
				break;
			default:
				console.error(`.dungeon | Failed to fetch icon: ${path}`);
				return;
		};

		console.debug(`.dungeon | Adding icon ${path} to the cache`);
		const svg = this.#parseSVG(await r.text());
		DotDungeonIcon._cache.set(path, svg);
		return svg;
	};

	/** Takes an SVG string and returns it as a DOM node */
	#parseSVG(content) {
		const temp = document.createElement(`div`);
		temp.innerHTML = content;
		return temp.querySelector(`svg`);
	}
};
