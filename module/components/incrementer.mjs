/**
Attributes:
@property {number} value
@property {number} stepSize
@property {number} largeStepSize
*/
class DotDungeonIncrementer extends HTMLElement {

	#input;

	constructor() {
		super();

		const sr = this.attachShadow({ mode: `open` });
		const container = document.createElement(`div`);

		const style = document.createElement(`link`);
		style.href = `./systems/dotdungeon/.styles/components/incrementer.css`;
		style.rel = `stylesheet`;
		container.appendChild(style);


		const input = document.createElement(`input`);
		this.#input = input;
		input.type = `number`;
		input.value = this.getAttribute(`value`);
		input.addEventListener(`change`, this.#updateValue.bind(this));

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

	#updateValue() {
		// TODO: Emit a change event for the new value, and check for cancellation
		const event = new Event(`change`);
		this.dispatchEvent(event);
	};

	#increment() {
		console.log(`increment event`)
		this.#input.value++;
		this.#updateValue();
	};

	#decrement() {
		console.log(`decrement event`)
		this.#input.value--;
		this.#updateValue();
	};
};


if (!window.customElements.get(`dd-incrementer`)) {
	window.customElements.define(`dd-incrementer`, DotDungeonIncrementer);
};
