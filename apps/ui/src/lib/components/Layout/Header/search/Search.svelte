<script lang="ts">
	import { page } from '$app/stores';
	import RandomQuestionButton from './RandomQuestionButton.svelte';
	import SubmitButton from './SubmitButton.svelte';
	import Input from './Input.svelte';

	let queryValue = '';

	// Update input when query in the URL changes
	$: urlQueryValue = $page.url.searchParams.get('q') || '';
	$: urlQueryValue, (queryValue = urlQueryValue);
</script>

<form action="/question" method="get" class="contents">
	<div class="flex w-full grow items-center justify-between">
		<Input bind:queryValue {urlQueryValue} />
		<RandomQuestionButton bind:queryValue {urlQueryValue} mobile />
	</div>
	<div class="flex gap-x-2">
		<RandomQuestionButton bind:queryValue {urlQueryValue} />
		<SubmitButton {queryValue} {urlQueryValue} />
	</div>
</form>
