export class PopoutTextEditor extends FormApplication {

	/**
	 * Creates a form
	 */
	static create(value) {};

	/** @override */
	constructor(actor, property, options = {}) {
		super(actor, options);
		this.property = property;
	};

	static get defaultOptions() {
		const opts = mergeObject({
			...super.defaultOptions,
			title: `Rich Text Editor`,
			template: `systems/dotdungeon/templates/dialogs/text-editor.hbs`,
			width: 500,
			height: 600,
			submitOnClose: false,
			resizable: true,
		});
		return opts;
	};

	async getData() {
		const ctx = await super.getData();

		ctx.editor = {
			engine: `prosemirror`,
			collaborate: true,
			content: await TextEditor.enrichHTML(
				await getProperty(this.document, this.property),
				{
					relativeTo: this.object,
					secrets: this.object.isOwner,
					async: true
				}
			),
			target: this.property,
		};

		return ctx;
	};

	async _updateObject(_event, formData) {
		console.log(formData);
		this.document.update({ [this.property]: formData["text"] })
	};
};
