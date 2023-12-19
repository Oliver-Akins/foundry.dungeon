import registerClientSettings from "./client_settings.mjs";
import registerDevSettings from "./dev_settings.mjs";

export default function registerSettings() {
	registerClientSettings();
	registerDevSettings();
};