import { Aspect } from "./Aspect.mjs";
import { DotDungeonItem } from "./GenericItem.mjs";

const classes = {
	aspect: Aspect,
};

export const ItemProxy = new Proxy(function () {}, {
	construct(target, args) {
		const [data] = args;

		if (!classes.hasOwnProperty(data.type)) {
			return new DotDungeonItem(...args);
		}

		return new classes[data.type](...args);
	},
	get(target, prop, receiver) {
		console.log(prop)
		if (["create", "createDocuments"].includes(prop)) {
			return function (data, options) {
				if (data.constructor === Array) {
					return data.map(i => ItemProxy.create(i, options))
				}

				if (!classes.hasOwnProperty(data.type)) {
					return DotDungeonItem.create(data, options);
				}

				return classes[data.type].create(data, options)
			};
		};

		if (prop == Symbol.hasInstance) {
			return function (instance) {
				return Object.values(classes).some(i => instance instanceof i)
			};
		};

		return DotDungeonItem[prop];
	},
});
