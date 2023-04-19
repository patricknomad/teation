<script lang="ts">
	import type Answer from '$lib/types/Answer';
	import Media from '$lib/components/Media/Media.svelte';

	export let results: Answer[];

	// When a video starts playing, pause all other videos
	const players: { [key: string]: YT.Player } = {};
	function onPlaying(event: CustomEvent<{ answer: Answer }>) {
		for (let answerId in players) {
			if (answerId !== event.detail.answer.id) {
				players[answerId].pauseVideo();
			}
		}
	}
</script>

{#each results as answer}
	<Media {answer} bind:player={players[answer.id]} on:playing={onPlaying} />
{/each}
