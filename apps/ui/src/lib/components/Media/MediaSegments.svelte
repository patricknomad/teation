<script lang="ts">
	import { getContext } from 'svelte';
	import type Answer from '$lib/types/Answer';
	import MediaSegment from './MediaSegment.svelte';

	const answer: Answer = (getContext('answer') as Function)();
</script>

<div class="flex flex-grow flex-wrap gap-x-4">
	<div class="mr-1 font-light">Segments</div>
	{#each answer.segments as segment}
		<MediaSegment {segment} />
	{/each}
</div>
