export function secondsToReadable(totalInSeconds: number) {
	// show minutes:seconds or hours:minutes:seconds if over an hour, only pad minutes if hours are shown, always pad seconds
	const hours = Math.floor(totalInSeconds / 3600);
	const minutes = Math.floor((totalInSeconds - hours * 3600) / 60);
	const seconds = Math.floor(totalInSeconds - hours * 3600 - minutes * 60);
	const pad = (n: number) => (n < 10 ? `0${n}` : n);
	return hours > 0 ? `${hours}:${pad(minutes)}:${pad(seconds)}` : `${minutes}:${pad(seconds)}`;
}
