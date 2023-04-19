// Some of this code was inspired by https://github.com/sveltecasts/svelte-youtube/pull/2

import YouTubeAPILoader from './YouTubeAPILoader';

import type { YouTubeAPIReadyCallback } from '$lib/types/MediaPlayerYouTubeAPI';
import type YouTubeAPI from '$lib/types/MediaPlayerYouTubeAPI';
import type {
	MediaPlayerYouTubeEvents,
	MediaPlayerYouTubeParams
} from '$lib/types/MediaPlayerYouTube';

declare global {
	interface Window {
		onYouTubeIframeAPIReady: YouTubeAPIReadyCallback;
		YT: YouTubeAPI;
	}
}

export default class YouTubePlayer {
	private api?: YouTubeAPI;

	constructor(public params: MediaPlayerYouTubeParams, public events: MediaPlayerYouTubeEvents) {
		this.params = params;
		this.events = events;
	}

	static generateKey() {
		return 'player_youtube_' + Math.round(Math.random() * 100000).toString();
	}

	async add(): Promise<any> {
		const youTubeAPILoader = new YouTubeAPILoader();
		this.api = await youTubeAPILoader.load();
		return this.create();
	}

	private create() {
		return new Promise((resolve) => {
			// If player already exists, don't create it again (if it's not a DIV then it's probably an iframe)
			const playerContainer = document.getElementById(this.params.key);
			if (playerContainer && playerContainer.tagName !== 'DIV') {
				return resolve({ player: window.YT.get(this.params.key) });
			}

			this.addPlayerToContainer().then(resolve);
		});
	}

	private adjustPlayerSize() {
		const playerContainer = document.getElementById(this.params.key);
		if (playerContainer) {
			playerContainer.removeAttribute('width');
			playerContainer.removeAttribute('height');
		}
	}

	private onStateChange(event: YT.OnStateChangeEvent) {
		const state = event.data;
		if (state == YT.PlayerState.PLAYING) {
			this.events.onPlaying();
		} else if (state == YT.PlayerState.PAUSED || state == YT.PlayerState.ENDED) {
			this.events.onStopped();
		}
	}

	private async addPlayerToContainer() {
		const playerVars = {
			start: this.params.start
		} satisfies YT.PlayerVars;

		const events = {
			onReady: () => this.adjustPlayerSize(),
			onStateChange: (event) => this.onStateChange(event),
			onError: () => this.events.onError()
		} satisfies YT.Events;

		const youtube = new this.api.Player(this.params.key, {
			height: 390,
			width: 640,
			videoId: this.params.videoId,
			playerVars,
			events
		} satisfies YT.PlayerOptions);

		this.adjustPlayerSize();

		const player = new Proxy(youtube, {
			/* eslint-disable @typescript-eslint/no-explicit-any */
			get: function (target: Record<string | symbol, any>, prop) {
				const value = target[prop];
				return typeof value === 'function' ? value.bind(target) : undefined;
			}
		});

		return { player };
	}
}
