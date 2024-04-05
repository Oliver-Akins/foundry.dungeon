/**
Attributes:
@property {string} name - The path to the value to update
@property {number} value - The actual value of the input

Styling:
- `--height`: Controls the height of the element + the width of the buttons (default: 1.25rem)
- `--width`: Controls the width of the number input (default 50px)
*/
export class DotDungeonIncrementer extends HTMLElement {
	static elementName = `dd-incrementer`;

	static styles = ``;

	#input;
	#publicInput;
	#sr;

	constructor() {
		super();

		const value = this.getAttribute(`value`);

		/*
		This input exists for the sole purpose of making it so that the form data
		works with this input without needing to do jank work arounds (even though
		this on it's own is already a sort of jank work around).
		*/
		const hiddenInput = document.createElement(`input`);
		hiddenInput.type = `hidden`;
		hiddenInput.name = this.getAttribute(`name`);
		hiddenInput.value = value;
		this.#publicInput = hiddenInput;
		this.appendChild(hiddenInput);

		const sr = this.attachShadow({ mode: `open` });
		this.#sr = sr;
		const container = document.createElement(`div`);
		if (DotDungeonIncrementer.styles) this.#embedStyles();

		const input = document.createElement(`input`);
		this.#input = input;
		input.type = `number`;
		input.addEventListener(`change`, this.#updateValue.bind(this));
		input.value = value;

		const increment = document.createElement(`button`);
		increment.innerHTML = `+`;
		increment.type = `button`;
		increment.classList.value = `increment`;
		increment.addEventListener(`click`, this.#increment.bind(this));

		const decrement = document.createElement(`button`);
		decrement.innerHTML = `-`;
		decrement.type = `button`;
		decrement.classList.value = `decrement`;
		decrement.addEventListener(`click`, this.#decrement.bind(this));


		// Construct the DOM
		container.appendChild(decrement);
		container.appendChild(input);
		container.appendChild(increment);
		sr.appendChild(container);
	};

	connectedCallback() {
		if (!DotDungeonIncrementer.styles) {
			fetch(`./systems/dotdungeon/.styles/components/incrementer.css`)
			.then(r => r.text())
			.then(t => {
				DotDungeonIncrementer.styles = t;
				this.#embedStyles();
			});
		};
	};

	#embedStyles() {
		const style = document.createElement(`style`);
		style.innerHTML = DotDungeonIncrementer.styles;
		this.#sr.appendChild(style);
	};

	#updateValue() {
		this.#publicInput.value = this.#input.value;
		const event = new Event(`change`, { bubbles: true });
		this.#publicInput.dispatchEvent(event);
	};

	#increment() {
		this.#input.value++;
		this.#updateValue();
	};

	#decrement() {
		this.#input.value--;
		this.#updateValue();
	};
};


if (!window.customElements.get(DotDungeonIncrementer.elementName)) {
	window.customElements.define(
		DotDungeonIncrementer.elementName,
		DotDungeonIncrementer
	);
};
