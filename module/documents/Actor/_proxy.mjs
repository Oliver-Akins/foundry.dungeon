import { DotDungeonActor } from "./GenericActor.mjs";
import { Player } from "./Player.mjs";
import { Sync } from "./Sync.mjs";
import { Mob } from "./Mob.mjs";

const classes = {
	player: Player,
	mob: Mob,
	sync: Sync,
};

export const ActorProxy = new Proxy(function () {}, {
	construct(target, args) {
		const [data] = args;

		if (!classes.hasOwnProperty(data.type)) {
			return new DotDungeonActor(...args);
		}

		return new classes[data.type](...args);
	},
	get(target, prop, receiver) {

		if (["create", "createDocuments"].includes(prop)) {
			return function (data, options) {
				if (data.constructor === Array) {
					return data.map(i => ItemProxy.create(i, options))
				}

				if (!classes.hasOwnProperty(data.type)) {
					return DotDungeonActor.create(data, options);
				}

				return classes[data.type].create(data, options)
			};
		};

		if (prop == Symbol.hasInstance) {
			return function (instance) {
				return Object.values(classes).some(i => instance instanceof i)
			};
		};

		return DotDungeonActor[prop];
	},
});
