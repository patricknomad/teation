<script lang="ts">
	import { getContext } from 'svelte';
	import type Answer from '$lib/types/Answer';
	import MediaSegments from './MediaSegments.svelte';

	const answer: Answer = (getContext('answer') as Function)();
</script>

<div class="flex-nowrap gap-x-12 px-6 pt-5 sm:flex">
	<h1 class="mb-2 flex-grow text-xl font-semibold sm:mb-0">
		{answer.title}
	</h1>
	<div class="whitespace-nowrap text-gray-500">
		{answer.source.title}
	</div>
</div>

<hr class="my-4 sm:hidden" />

<div class="flex-nowrap gap-x-12 px-6 pb-5 sm:mt-3 sm:flex">
	<MediaSegments />
	<!-- <div class="mt-5 sm:mt-0"><a href="#" class="text-purple-500">View Related</a></div> -->
</div>
