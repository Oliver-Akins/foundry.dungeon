export function schemaOptions(document, schemaPath) {
	let splitPath = schemaPath.split(`.`);

	let tempLocation = document.schema.fields.system;
	for (const part of splitPath) {
		tempLocation = tempLocation[part].fields
	}

	return CONFIG.Actor.dataModels.player.schema.fields.weapon.fields.mainHand.fields.damage.options.options;
};
