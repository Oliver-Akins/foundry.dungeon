/*
The purpose of this script is to validate all of the language files to ensure
that there are no cycles in them to prevent infinite recursion. This must pull
the pattern to match subkeys on via the config, otherwise this could result in
inconsistencies with the localizer logic.
*/

import { readFile } from "fs/promises";

class Node {
	/** @type {Array<Node>} */
	connectsTo = [];

	/** @type {boolean} */
	visited = false;

	/** @type {boolean} */
	finished = false;

	id;
	constructor(data) { this.id = data; };
};

/**
 * @param {object | string} lang The localization object to convert into a graph
 * @returns {Promise<Array<Node> | Node>}
 */
async function createGraph(data) {
	throw new Error(`createGraph not Implemented Yet`);
};

/**
 * @param {Node} from
 * @returns {Promise<boolean|void>}
 */
async function depthFirstSearch(from) {
	if (from.finished) return false;
	if (from.visited) return true;
	from.visited = true;
	for (const neighbour of from.connectsTo) {
		if (depthFirstSearch(neighbour)) return true;
	};
	from.finished = true;
	return false;
};

/**
 * @param {Array<Node>} graph
 */
async function checkForCycles(graph) {
	for (const node of graph) {
		if (node.finished) {
			console.log(`skipping node: ${node.id}`);
			continue;
		}
		if (depthFirstSearch(node)) {
			console.log(`cycle found in node: ${node.id}`);
		};
	};
};

async function main() {
	/*
	Process:
		- Load the system.json to identify all lang files
		- Iterate through defined languages
			- Construct a graph from the language file
			- Iterate through nodes checking for a cycle
	*/
	const lang = JSON.parse(await readFile("test.lang") ?? "{}");
	const graph = await createGraph(lang);
	console.log(graph)
	// await checkForCycles(graph);
};

main();
