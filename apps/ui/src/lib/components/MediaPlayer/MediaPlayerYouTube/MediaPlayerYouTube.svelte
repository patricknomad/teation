<script lang="ts">
	import { createEventDispatcher, getContext, onDestroy, onMount } from 'svelte';

	import type {
		MediaPlayerYouTubeEvents,
		MediaPlayerYouTubeParams
	} from '$lib/types/MediaPlayerYouTube';
	import type MediaState from '$lib/types/MediaState';
	import type { Writable } from 'svelte/store';
	import type Answer from '$lib/types/Answer';

	import { startMediaStateUpdater, stopMediaStateUpdater } from './media-state-checker';
	import MediaPlayerYouTubePlayer from './YouTubePlayer';

	const dispatch = createEventDispatcher();
	const key = MediaPlayerYouTubePlayer.generateKey();

	const answer: Answer = (getContext('answer') as Function)();
	const mediaState: Writable<MediaState> = getContext('mediaState');

	const playerParams = {
		key,
		videoId: answer.media.id,
		start: answer.segments[0].start // first segment's start time
	} satisfies MediaPlayerYouTubeParams;

	const playerEvents = {
		onPlaying() {
			if ($mediaState.player) {
				$mediaState.currentTime = $mediaState.player.getCurrentTime();
			}
			$mediaState.everPlayed = true;
			$mediaState.playing = true;
			startMediaStateUpdater($mediaState);
			dispatch('playing', { answer });
		},

		onStopped() {
			$mediaState.playing = false;
			stopMediaStateUpdater($mediaState);
		},

		onError() {
			$mediaState.playing = false;
			$mediaState.videoUnplayable = true;
			stopMediaStateUpdater($mediaState);
		},

		onDestroy() {
			$mediaState.playing = false;
			stopMediaStateUpdater($mediaState);
		}
	} satisfies MediaPlayerYouTubeEvents;

	onMount(() => {
		const player = new MediaPlayerYouTubePlayer(playerParams, playerEvents);
		player.add().then(({ player }) => {
			$mediaState.player = player;
		});
	});

	onDestroy(() => {
		stopMediaStateUpdater($mediaState);
		playerEvents.onDestroy();
	});
</script>

<div>
	<div id={key} class="aspect-video w-full" />
</div>
