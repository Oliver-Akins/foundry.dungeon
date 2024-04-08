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

	static styles = ``;

	#min;
	#max;
	#smallStep;
	#largeStep;

	#input;
	#publicInput;
	#sr;

	constructor() {
		super();

		this._internals = this.attachInternals();

		const value = this.getAttribute(`value`);
		this.#min = parseInt(this.getAttribute(`min`) ?? 0);
		this.#max = parseInt(this.getAttribute(`max`) ?? 0);
		this.#smallStep = parseInt(this.getAttribute(`smallStep`) ?? 1);
		this.#largeStep = parseInt(this.getAttribute(`largeStep`) ?? 5);

		const sr = this.attachShadow({
			mode: `open`,
			delegatesFocus: true
		});
		this.#sr = sr;
		const container = document.createElement(`div`);
		if (DotDungeonIncrementer.styles) this.#embedStyles();

		// The input that the user can see / modify
		const input = document.createElement(`input`);
		this.#input = input;
		input.type = `number`;
		input.min = this.getAttribute(`min`);
		input.max = this.getAttribute(`max`);
		input.addEventListener(`change`, this.#updateValue.bind(this));
		input.value = value;

		// input.id = this.id;
		// this.removeAttribute(`id`);

		// plus button
		const increment = document.createElement(`span`);
		increment.innerHTML = `+`;
		// increment.type = `button`;
		// increment.tabIndex = -1;
		increment.classList.value = `increment`;
		increment.addEventListener(`click`, this.#increment.bind(this));

		// minus button
		const decrement = document.createElement(`span`);
		decrement.innerHTML = `-`;
		// decrement.type = `button`;
		// decrement.tabIndex = -1;
		decrement.classList.value = `decrement`;
		decrement.addEventListener(`click`, this.#decrement.bind(this));


		// Construct the DOM
		container.appendChild(decrement);
		container.appendChild(input);
		container.appendChild(increment);
		sr.appendChild(container);
	};

	connectedCallback() {
		/*
		This input exists for the sole purpose of making it so that the form data
		works with this input without needing to do jank work arounds, as Foundry
		only listens for change events from a small subset of elements which makes
		this a bit a jank work around as it is.
		*/
		const hiddenInput = document.createElement(`input`);
		this.#publicInput = hiddenInput;
		hiddenInput.type = `hidden`;
		hiddenInput.value = this.#input.value;
		hiddenInput.name = this.getAttribute(`name`);
		// this.removeAttribute(`name`);
		// this.appendChild(hiddenInput);

		if (!DotDungeonIncrementer.styles) {
			fetch(`./systems/dotdungeon/.styles/v3/components/incrementer.css`)
			.then(r => r.text())
			.then(t => {
				DotDungeonIncrementer.styles = t;
				this.#embedStyles();
			});
		};
	};

	get value() {
		return this.#input.value;
	};
	get form() {
		return this._internals.form;
	};
	get type() {
		return `number`;
	};

	#embedStyles() {
		const style = document.createElement(`style`);
		style.innerHTML = DotDungeonIncrementer.styles;
		this.#sr.appendChild(style);
	};

	#updateValue() {
		let value = parseInt(this.#input.value);
		if (this.getAttribute(`min`)) value = Math.max(this.#min, value);
		if (this.getAttribute(`max`)) value = Math.min(this.#max, value);
		this.#input.value = value;
		if (this.#input.value === this.#publicInput.value) return;
		this.#publicInput.value = value;
		const event = new Event(`change`);
		// this.#publicInput.dispatchEvent(event);
		console.log(`#updateValue`)
		this.dispatchEvent(event);
	};

	#increment($e) {
		let value = parseInt(this.#input.value);
		value += $e.ctrlKey ? this.#largeStep : this.#smallStep;
		this.#input.value = value;
		this.#updateValue();
	};

	#decrement($e) {
		let value = parseInt(this.#input.value);
		value -= $e.ctrlKey ? this.#largeStep : this.#smallStep;
		this.#input.value = value;
		this.#updateValue();
	};

	focus() {
		console.log(1)
		super.focus();
	}
};


if (!window.customElements.get(DotDungeonIncrementer.elementName)) {
	window.customElements.define(
		DotDungeonIncrementer.elementName,
		DotDungeonIncrementer
	);
};
