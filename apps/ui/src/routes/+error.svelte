<script>
	import { env } from '$env/dynamic/public';
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>{$page.status} {$page.error?.message} | {env.PUBLIC_BRANDING_NAME}</title>
</svelte:head>

<div class="relative mx-auto mb-12 max-w-screen-sm pt-48 drop-shadow-sm">
	<article
		class="overflow-hidden border bg-white px-10 pb-10 pt-9 text-xl antialiased sm:rounded-xl"
	>
		<h1 class="text-center text-2xl font-bold">
			{$page.status}
			{$page.error?.message}
		</h1>
	</article>
</div>
