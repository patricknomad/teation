<script lang="ts">
	import { getContext } from 'svelte';
	import type Answer from '$lib/types/Answer';

	const answer: Answer = (getContext('answer') as Function)();
</script>

<div class="flex aspect-video w-full items-center justify-center bg-gray-500">
	{answer.media.id}
</div>
