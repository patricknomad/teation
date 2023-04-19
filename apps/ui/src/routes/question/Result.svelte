<script lang="ts">
	import type QuestionResponse from '$lib/types/QuestionResponse';

	import MessageCard from '$lib/components/MessageCard/MessageCard.svelte';
	import MediaList from '$lib/components/MediaList/MediaList.svelte';
	import ErrorMessage from './ErrorMessage.svelte';

	export let data: QuestionResponse;

	function hasError(data: QuestionResponse) {
		return !data || !data.results;
	}

	function hasResults(data: QuestionResponse) {
		return data && data.results && data.results.length > 0;
	}
</script>

{#if hasError(data)}
	<ErrorMessage />
{:else if hasResults(data)}
	<MediaList results={data.results} />
{:else}
	<MessageCard title="No results" message="No conversations were found that match your search." />
{/if}
