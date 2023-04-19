export interface MediaPlayerYouTubeParams {
	key: string;
	videoId: string;
	start: number;
}

export interface MediaPlayerYouTubeEvents {
	onPlaying: () => void;
	onStopped: () => void;
	onError: () => void;
	onDestroy: () => void;
}
