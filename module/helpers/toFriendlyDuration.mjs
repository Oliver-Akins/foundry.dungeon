const secondsInAMinute = 60;
const secondsInAnHour = 60 * secondsInAMinute;


/**
 * Converts a duration into a more human-friendly format
 * @param {number} duration The length of time in seconds
 * @returns The human-friendly time string
 */
export function toFriendlyDuration(duration) {
	let friendly = ``;
	if (duration >= secondsInAnHour) {
		let hours = Math.floor(duration / secondsInAnHour);
		friendly += `${hours}h`;
		duration -= hours * secondsInAnHour;
	};
	if (duration >= secondsInAMinute) {
		let minutes = Math.floor(duration / secondsInAMinute);
		friendly += `${minutes}m`;
		duration -= minutes * secondsInAMinute;
	};
	if (duration > 0) {
		friendly += `${duration}s`;
	};
	return friendly;
};