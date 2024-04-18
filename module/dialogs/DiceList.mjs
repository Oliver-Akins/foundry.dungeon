import { GenericDialog } from "./GenericDialog.mjs";

export class DiceList extends GenericDialog {

	constructor(mobActor) {
		super({}, { title: `${mobActor.name}'s Dice List` });
		this.actor = mobActor;
		this.dice = this.actor.system.dice.map((d) => ({
			...d,
			id: randomID(),
		}));
	};

	static get defaultOptions() {
		const opts = foundry.utils.mergeObject({
			...super.defaultOptions,
			template: `systems/dotdungeon/templates/dialogs/diceList.hbs`,
			width: 275,
			height: 400,
			submitOnClose: false,
			resizable: true,
		});
		opts.classes?.push(`dotdungeon`);
		return opts;
	};

	async getData() {
		const ctx = await super.getData();
		ctx.dice = this.dice;
		return ctx;
	};

	async activateListeners(html) {
		super.activateListeners(html);

		if (!this.isEditable) return;
		console.debug(`.dungeon | DiceList adding event listeners`);

		html.find(`[data-die-update]`)
			.on(`change`, this.updateDieInMemoryOnly.bind(this))
	};

	async _updateObject(_event, formData) {
		const newDice = this.dice.map(d => {
			return {
				count: formData[`${d.id}.count`],
				sides: formData[`${d.id}.sides`],
				repeat: formData[`${d.id}.repeat`],
			};
		});
		await this.actor.update({ "system.dice": newDice });
	};

	updateDieInMemoryOnly($e) {
		const target = $e.currentTarget;
		const data = target.dataset;
		const value = target.value;
		const [ dieId, field ] = data.dieUpdate.split(`.`);
		for (const die of this.dice) {
			if (die.id === dieId) {
				die[field] = value;
				return
			};
		};
	};

	addDie() {
		this.dice.push({
			count: 1,
			sides: 2,
			repeat: 1,
			id: randomID(),
		});
		this.render();
	};

	deleteDie($e) {
		const data = $e.currentTarget.dataset;
		this.dice = this.dice.filter(d => d.id !== data.id);
		this.render();
	};
};
