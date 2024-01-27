import PlayerActor from "./Player.mjs";

/** @extends {Actor} */
export class ActorHandler extends Actor {
	proxyTargets = {
		player: PlayerActor,
	};

	constructor(data, ctx) {
		super(data, ctx);
	};

	/** @type {class|undefined} */
	get fn() {
		return this.proxyTargets[this.type];
	};

	async proxyFunction(funcName, ...args) {
		if (!this.fn?.[funcName]) return;
		return await this.fn?.[funcName].bind(this)(...args);
	};

	async openEmbeddedSheet($event) {
		if (this.fn?.openEmbeddedSheet) {
			this.fn.openEmbeddedSheet.bind(this)($event);
		} else {
			const data = $event.target.dataset;
			let item = await fromUuid(data.embeddedEdit);
			item?.sheet.render(true);
		};
	};

	async genericEmbeddedUpdate($event) {
		if (this.fn?.genericEmbeddedUpdate) {
			return this.fn.genericEmbeddedUpdate.bind(this)($event);
		};
		const target = $event.delegateTarget;
		const data = target.dataset;
		const item = await fromUuid(data.embeddedId);

		let value = target.value;
		switch (target.type) {
			case "checkbox": value = target.checked; break;
		};

		await item?.update({ [data.embeddedUpdate]: value });
	};

	async genericEmbeddedDelete($event) {
		if (!this.fn?.genericEmbeddedDelete) return;
		this.fn.genericEmbeddedDelete.bind(this)($event);
	};

	async genericEmbeddedCreate($event) {
		const data = $event.currentTarget.dataset;
		if (!this.fn?.[`createCustom${data.embeddedCreate}`]) return;
		this.fn?.[`createCustom${data.embeddedCreate}`].bind(this)($event);
	};

	async genericSendToChat($event) {
		const data = $event.currentTarget.dataset;
		const type = data.messageType;
		console.log(data)
		if (this.fn?.[`send${type}ToChat`]) {
			return await this.fn?.[`send${type}ToChat`].bind(this)($event);
		};
		if (!data.messageContent) {
			console.warn(`.dungeon | Tried to send a chat message with no content`);
			return;
		};
		let message = await ChatMessage.create({
			content: data.messageContent,
			flavor: data.messageFlavor,
			speaker: { actor: this.actor }
		});
		message.render();
	};

	/**
	 * @param {ItemHandler} item
	 * @returns {boolean} true to allow the document to be embedded
	 */
	async preItemEmbed(item) {
		let type = item.type[0].toUpperCase() + item.type.slice(1);
		if (this.fn?.[`pre${type}Embed`]) {
			return await this.fn?.[`pre${type}Embed`].bind(this)(item);
		};
		return true;
	};
};
