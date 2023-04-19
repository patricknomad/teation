import type YouTubeAPI from '$lib/types/MediaPlayerYouTubeAPI';

export default class YouTubeAPILoader {
	apiUrl = 'https://www.youtube.com/iframe_api';

	load(): Promise<YouTubeAPI> {
		return new Promise((resolve) => {
			this.whenAPIReady().then(resolve);
			this.addScriptTag();
		});
	}

	whenAPIReady(): Promise<YouTubeAPI> {
		return new Promise((resolve) => {
			if (window.YT) {
				// If the API was previously loaded, then use the API's ready callback
				window.YT.ready(() => resolve(window.YT));
			} else {
				// If the API was not previously loaded, add a listener for the API's ready callback
				this.addOnAPIReadyDispatch();
				window.addEventListener('YouTubeIframeAPIReady', () => resolve(window.YT));
			}
		});
	}

	addOnAPIReadyDispatch(): void {
		if (!window.onYouTubeIframeAPIReady) {
			window.onYouTubeIframeAPIReady = () => {
				window.dispatchEvent(new Event('YouTubeIframeAPIReady'));
			};
		}
	}

	scriptTagExists(): boolean {
		const scripts = document.getElementsByTagName('script');
		for (let i = scripts.length; i--; ) {
			if (scripts[i].src === this.apiUrl) {
				return true;
			}
		}

		return false;
	}

	addScriptTag(): void {
		if (this.scriptTagExists()) {
			return;
		}

		const tag = document.createElement('script');
		tag.src = this.apiUrl;
		const divTagsInBody = document.querySelectorAll('body > div');
		const firstDivTagInBody = divTagsInBody[0];
		firstDivTagInBody.parentNode?.insertBefore(tag, firstDivTagInBody);
	}
}
