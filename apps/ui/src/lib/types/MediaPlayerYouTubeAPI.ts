export type YouTubeAPIReadyCallback = () => void;

export default interface YouTubeAPI {
	ready: (callback: YouTubeAPIReadyCallback) => void;
	get: (key: string) => typeof YT.Player;
	Player: typeof YT.Player;
}
