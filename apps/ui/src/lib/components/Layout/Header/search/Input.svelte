<script lang="ts">
	import { onMount } from 'svelte';

	export let queryValue: string;
	export let urlQueryValue: string;

	let searchInput: HTMLInputElement;

	/**
	 * When blurring input and the value is empty, reset it to the URL query.
	 */
	function resetToUrlIfEmpty() {
		if (!queryValue) {
			queryValue = urlQueryValue;
		}
	}

	/**
	 * Make a clearQuestion function to clear the queryValue and focus the input
	 */
	function clearQuestion() {
		queryValue = '';
		searchInput.focus();
	}

	onMount(() => {
		// Focus on the input field when the component mounts and input is empty.
		// This is the Svelte equivalent of setting autofocus on the input.
		if (!queryValue) {
			searchInput.focus();
		}
	});
</script>

<input
	name="q"
	type="text"
	class="h-10 flex-grow rounded-l-full border border-gray-300 pr-1 text-sm font-semibold tracking-tight antialiased focus:border-gray-300 focus:ring-0 sm:h-16 sm:text-base md:rounded-r-none md:border-r-0 md:pl-4 lg:pl-6 lg:text-lg lg:tracking-normal"
	class:rounded-r-full={!queryValue}
	placeholder="Ask a question"
	autocomplete="off"
	autocapitalize="off"
	autocorrect="off"
	bind:value={queryValue}
	bind:this={searchInput}
	on:blur={resetToUrlIfEmpty}
/>

{#if queryValue}
	<button
		class="h-10 rounded-r-full border border-l-0 border-gray-300 pb-1 pl-3 pr-4 pt-0 font-light text-gray-600 hover:text-gray-900 sm:h-16 sm:pl-2 sm:pr-6 sm:text-2xl md:rounded-r-none md:border-r-0"
		type="button"
		on:click={clearQuestion}>x</button
	>
{/if}
