// Type definitions for Foundry VTT v11
// Definitions by: Oliver Akins

namespace foundry {
	export const data: any;
	export const abstract: any;
}

interface Game {
	/**
	 * The named view which is currently active.
	 * Game views include: join, setup, players, license, game, stream
	*/
	readonly view: string;

	/** The object of world data passed from the server */
	readonly data: object;

	/** The Release data for this version of Foundry */
	readonly release: config.ReleaseData;

	/** The id of the active World user, if any */
	readonly userId: string | null;

	/** A mapping of WorldCollection instances, one per primary Document type. */
	readonly collections: Collection<string, WorldCollection>

	/** A mapping of CompendiumCollection instances, one per Compendium pack. */
	readonly packs: CompendiumPacks<string,CompendiumCollection>;

	/** A singleton web Worker manager. */
	readonly workers: WorkerManager;

	/** Localization support */
	readonly i18n: Localization;

	/** The Keyboard Manager */
	readonly keyboard: KeyboardManager;

	/** The Mouse Manager */
	readonly mouse: MouseManager;

	/** The Gamepad Manager */
	readonly gamepad: GamepadManager;

	/** The New User Experience manager. */
	readonly nue: NewUserExperience;

	/** The client session id which is currently active */
	readonly sessionId: string;

	/** Client settings which are used to configure application behavior */
	readonly settings: ClientSettings;

	/** Client keybindings which are used to configure application behavior */
	readonly keybindings: ClientKeybindings;

	/** A reference to the open Socket.io connection */
	readonly socket: WebSocket | null;

	/**
	 * A singleton GameTime instance which manages the progression of time within
	 * the game world.
	 */
	readonly time: GameTime;

	/** A singleton reference to the Canvas object which may be used. */
	readonly canvas: Canvas;

	/** A singleton instance of the Audio Helper class */
	readonly audio: AudioHelper;

	/** A singleton instance of the Video Helper class */
	readonly video: VideoHelper;

	/** A singleton instance of the TooltipManager class. */
	readonly tooltip: TooltipManager;

	/** A singleton instance of the Clipboard Helper class. */
	readonly clipboard: ClipboardHelper;

	/** A singleton instance of the Tour collection class */
	readonly tours: Tours;

	/** The global document index. */
	readonly documentIndex: DocumentIndex;

	/** The singleton instance of the ClientIssues manager. */
	readonly issues: ClientIssues;
}
