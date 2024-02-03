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
		const opts = mergeObject({
			...super.defaultOptions,
			template: `systems/dotdungeon/templates/dialogs/diceList.hbs`,
			width: 400,
			height: 400,
			submitOnClose: true,
		});
		opts.classes.push(`dotdungeon`);
		return opts;
	};

	async getData() {
		const ctx = await super.getData();
		ctx.dice = this.dice;
		return ctx;
	};

	async _updateObject(event, formData) {
		console.log(event, formData);
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
};
