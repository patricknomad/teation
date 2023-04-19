<script>
	import '../app.postcss';
	import { env } from '$env/dynamic/public';

	import Footer from '$lib/components/Layout/Footer/Footer.svelte';
	import Header from '$lib/components/Layout/Header/Header.svelte';
</script>

<svelte:head>
	{#if env.PUBLIC_NO_INDEX}
		<meta name="robots" content="noindex nofollow" />
	{/if}
</svelte:head>

<Header />

<main>
	<slot />
</main>

<Footer />

<style global>
	body {
		background: #fff;
		color: #000;
		min-height: 100vh;
	}
</style>
