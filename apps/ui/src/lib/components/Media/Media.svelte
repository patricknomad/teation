<script lang="ts">
	import { writable, type Writable } from 'svelte/store';
	import { setContext } from 'svelte';

	import type MediaState from '$lib/types/MediaState';
	import type Answer from '$lib/types/Answer';

	import MediaPlayer from '../MediaPlayer/MediaPlayer.svelte';
	import MediaFooter from './MediaFooter.svelte';

	export let answer: Answer;
	export let player: YT.Player | undefined;

	const mediaState: Writable<MediaState> = writable({
		playing: false,
		currentTime: 0,
		everPlayed: false,
		videoUnplayable: false
	} satisfies MediaState);

	setContext('mediaState', mediaState);
	setContext('answer', () => answer);

	// Update exported `player` when the internal `player` changes
	$: player = $mediaState.player;
</script>

<div
	class="mx-auto mb-6 max-w-screen-md drop-shadow-xl md:mb-12 mdh:max-w-screen-lg xlh:max-w-screen-xl"
>
	<article class="mx-3 overflow-hidden rounded-lg border bg-white md:mx-8 md:rounded-xl">
		<MediaPlayer on:playing />
		<MediaFooter />
	</article>
</div>
