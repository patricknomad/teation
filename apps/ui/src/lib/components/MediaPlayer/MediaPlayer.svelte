<script lang="ts">
	import { env } from '$env/dynamic/public';
	import { getContext } from 'svelte';

	import type MediaState from '$lib/types/MediaState';
	import type { Writable } from 'svelte/store';
	import type Answer from '$lib/types/Answer';

	import MediaPlayerPlaceholder from './MediaPlayerPlaceholder/MediaPlayerPlaceholder.svelte';
	import MediaPlayerYouTube from './MediaPlayerYouTube/MediaPlayerYouTube.svelte';
	import MediaType from '$lib/types/MediaType';

	const usePlaceholder = env.PUBLIC_USE_MEDIA_PLACEHOLDER;

	const answer: Answer = (getContext('answer') as Function)();
	const mediaState: Writable<MediaState> = getContext('mediaState');
</script>

{#if usePlaceholder}
	<MediaPlayerPlaceholder />
{:else if !$mediaState.videoUnplayable && answer.media.type === MediaType.YOUTUBE}
	<MediaPlayerYouTube on:playing />
{/if}
