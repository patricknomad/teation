<script lang="ts">
	import { env } from '$env/dynamic/public';
	import { getContext } from 'svelte';
	import { secondsToReadable } from '$lib/formatters/interval';

	import type { Writable } from 'svelte/store';
	import type MediaState from '$lib/types/MediaState';
	import type Segment from '$lib/types/Segment';
	import type Answer from '$lib/types/Answer';

	export let segment: Segment;

	const usePlaceholder = env.PUBLIC_USE_MEDIA_PLACEHOLDER;

	const answer: Answer = (getContext('answer') as Function)();
	const mediaState: Writable<MediaState> = getContext('mediaState');

	$: currentTime = $mediaState.currentTime;
	$: mediaIsAtCurrentSegment = currentTime >= segment.start && currentTime <= segment.end;
	$: everPlayedAndMediaIsAtCurrentSegment = $mediaState.everPlayed && mediaIsAtCurrentSegment;

	function onClick(e: Event) {
		// If the media is unplayable (e.g. YouTube prevents video from being embedded), or if a placeholder
		// is being displayed, then don't prevent the default behavior, which would open link in a new tab.
		if (usePlaceholder || $mediaState.videoUnplayable || !$mediaState.player) {
			return;
		}

		e.preventDefault();
		$mediaState.player.seekTo(segment.start, true);
		$mediaState.currentTime = segment.start;
		$mediaState.player.playVideo();
	}
</script>

<a
	target="_blank"
	class="text-purple-500"
	class:underline={everPlayedAndMediaIsAtCurrentSegment}
	class:underline-offset-4={everPlayedAndMediaIsAtCurrentSegment}
	class:decoration-2={everPlayedAndMediaIsAtCurrentSegment}
	class:decoration-purple-100={everPlayedAndMediaIsAtCurrentSegment && !$mediaState.playing}
	href={`https://www.youtube.com/watch?v=${answer.media.id}&t=${segment.start}`}
	on:click={onClick}
>
	{secondsToReadable(segment.start)}
</a>
