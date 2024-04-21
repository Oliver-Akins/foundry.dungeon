import { DotDungeonActiveEffect } from "./GenericActiveEffect.mjs";

const classes = {};

const defaultClass = DotDungeonActiveEffect;

export const ActiveEffectProxy = new Proxy(function () {}, {
	construct(target, args) {
		const [data] = args;

		if (!classes.hasOwnProperty(data.type)) {
			return new defaultClass(...args);
		}

		return new classes[data.type](...args);
	},
	get(target, prop, receiver) {

		if (["create", "createDocuments"].includes(prop)) {
			return function (data, options) {
				if (data.constructor === Array) {
					return data.map(i => ActiveEffectProxy.create(i, options))
				}

				if (!classes.hasOwnProperty(data.type)) {
					return defaultClass.create(data, options);
				}

				return classes[data.type].create(data, options);
			};
		};

		if (prop == Symbol.hasInstance) {
			return function (instance) {
				if (instance instanceof defaultClass) return true;
				return Object.values(classes).some(i => instance instanceof i);
			};
		};

		return defaultClass[prop];
	},
});
