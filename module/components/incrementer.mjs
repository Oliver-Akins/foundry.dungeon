/**
Attributes:
@property {string} name - The path to the value to update
@property {number} value - The actual value of the input
@property {number} min - The minimum value of the input
@property {number} max - The maximum value of the input
@property {number?} smallStep - The step size used for the buttons and arrow keys
@property {number?} largeStep - The step size used for the buttons + Ctrl and page up / down

Styling:
- `--height`: Controls the height of the element + the width of the buttons (default: 1.25rem)
- `--width`: Controls the width of the number input (default 50px)
*/
export class DotDungeonIncrementer extends HTMLElement {
	static elementName = `dd-incrementer`;
	static formAssociated = true;

	static #styles = ``;
	_internals;
	_shadow;
	#input;

	_min;
	_max;
	_smallStep;
	_largeStep;

	constructor() {
		super();
		this._shadow = this.attachShadow({ mode: `open`, delegatesFocus: true });
		this._internals = this.attachInternals();
		this._internals.role = `spinbutton`;

		const value = this.getAttribute(`value`);
		this._min = parseInt(this.getAttribute(`min`) ?? 0);
		this._max = parseInt(this.getAttribute(`max`) ?? 0);
		this._smallStep = parseInt(this.getAttribute(`smallStep`) ?? 1);
		this._largeStep = parseInt(this.getAttribute(`largeStep`) ?? 5);

		this._internals.ariaValueMin = this._min;
		this._internals.ariaValueMax = this._max;

		const container = document.createElement(`div`);
		if (DotDungeonIncrementer.#styles) this.#embedStyles();

		// The input that the user can see / modify
		const input = document.createElement(`input`);
		this.#input = input;
		input.type = `number`;
		input.ariaHidden = true;
		input.min = this.getAttribute(`min`);
		input.max = this.getAttribute(`max`);
		input.addEventListener(`change`, this.#updateValue.bind(this));
		input.value = value;

		// plus button
		const increment = document.createElement(`span`);
		increment.innerHTML = `+`;
		increment.ariaHidden = true;
		increment.classList.value = `increment`;
		increment.addEventListener(`mousedown`, this.#increment.bind(this));

		// minus button
		const decrement = document.createElement(`span`);
		decrement.innerHTML = `-`;
		decrement.ariaHidden = true;
		decrement.classList.value = `decrement`;
		decrement.addEventListener(`mousedown`, this.#decrement.bind(this));

		// Construct the DOM
		container.appendChild(decrement);
		container.appendChild(input);
		container.appendChild(increment);
		this._shadow.appendChild(container);
	};

	get form() {
		return this._internals.form;
	}

	get name() {
		return this.getAttribute(`name`);
	}
	set name(value) {
		this.setAttribute(`name`, value);
	}

	get value() {
		return this.getAttribute(`value`);
	};
	set value(value) {
		this.setAttribute(`value`, value);
	};

	get type() {
		return `number`;
	}

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

		if (!DotDungeonIncrementer.#styles) {
			fetch(`./systems/dotdungeon/.styles/v3/components/incrementer.css`)
			.then(r => r.text())
			.then(t => {
				DotDungeonIncrementer.#styles = t;
				this.#embedStyles();
			});
		};
	};

	#embedStyles() {
		const style = document.createElement(`style`);
		style.innerHTML = DotDungeonIncrementer.#styles;
		this._shadow.appendChild(style);
	};

	#updateValue() {
		let value = parseInt(this.#input.value);
		if (this.getAttribute(`min`)) value = Math.max(this._min, value);
		if (this.getAttribute(`max`)) value = Math.min(this._max, value);
		this.#input.value = value;
		this.value = value;
		this.dispatchEvent(new Event(`change`, { bubbles: true }));

		// NOTE: This may be really annoying, in that case, remove it later
		this.blur();
	};

	/** @param {Event} $e */
	#increment($e) {
		$e.preventDefault();
		let value = parseInt(this.#input.value);
		value += $e.ctrlKey ? this._largeStep : this._smallStep;
		this.#input.value = value;
		this.#updateValue();
	};

	/** @param {Event} $e */
	#decrement($e) {
		$e.preventDefault();
		let value = parseInt(this.#input.value);
		value -= $e.ctrlKey ? this._largeStep : this._smallStep;
		this.#input.value = value;
		this.#updateValue();
	};
};
