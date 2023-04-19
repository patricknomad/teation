<script>
	import { env } from '$env/dynamic/public';
	import Search from './search/Search.svelte';
</script>

<div class="absolute flex w-full">
	<div class="fixed left-0 top-5 z-50 w-full md:top-12">
		<div class="mx-auto w-full max-w-[1200px] px-5 sm:px-12">
			<div
				class="flex w-full flex-col items-center gap-x-2 rounded-[20px] border border-gray-200 bg-white px-5 py-3 drop-shadow-xl md:flex-row md:rounded-full md:px-3 lg:gap-x-4 lg:px-5"
			>
				<a href="/" class="ml-1 inline-block p-3"
					><img src={`/logo-${env.PUBLIC_BRANDING_SLUG}.svg`} alt={env.PUBLIC_BRANDING_NAME} /></a
				>
				<Search />
			</div>
		</div>
	</div>
</div>
