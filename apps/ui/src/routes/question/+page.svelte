<script lang="ts">
	import { env } from '$env/dynamic/public';
	import { page } from '$app/stores';
	import truncate from 'truncate';

	import type QuestionResponse from '$lib/types/QuestionResponse';

	import LoadingMessage from './LoadingMessage.svelte';
	import Hero from '$lib/components/Hero/Hero.svelte';
	import ErrorMessage from './ErrorMessage.svelte';
	import Result from './Result.svelte';

	// Separate promise from data otherwise server tries to load data
	let dataPromise: Promise<void>;
	let data: QuestionResponse;

	// Set currentQuery to the query in the URL any time it changes
	$: currentQuery = $page.url.searchParams.get('q') || '';
	// Load data anytime the query changes
	$: dataPromise = load(currentQuery);

	// This page does not use the SvelteKit page data loading mechanism because otherwise
	// SSR would attempt to load the AI response from the server (which sometimes takes
	// a while) and blocks the page render. Instead load the page, then show a loading
	// message. In the future maybe some questions could be cached on the server, or
	// respond with "fetching" and then update the page when the response is ready.
	// That would be useful for SEO and pre-hydrating the page.
	const fetchControllers: AbortController[] = [];
	async function load(query: string): Promise<void> {
		// Abort any previous fetches
		while (fetchControllers.length) {
			fetchControllers.pop()?.abort();
		}

		// Fetch data, add signal to be able to abort if a new query comes in
		const encoded = new URLSearchParams({ q: query });
		const controller = new AbortController();
		const fetchRequest = fetch(`/question.json?${encoded}`, { signal: controller.signal });
		fetchControllers.push(controller);

		const resp = await fetchRequest;
		data = (await resp.json()) as QuestionResponse;
	}
</script>

<svelte:head>
	<title>{truncate(currentQuery, 50)} | {env.PUBLIC_BRANDING_NAME}</title>
</svelte:head>

<Hero />

<div class="relative -top-[50px]">
	{#await dataPromise}
		<LoadingMessage />
	{:then}
		<Result {data} />
	{:catch}
		<ErrorMessage />
	{/await}
</div>
