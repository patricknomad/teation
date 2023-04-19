<script>
	import { env } from '$env/dynamic/public';
	import Hero from '$lib/components/Hero/Hero.svelte';
</script>

<svelte:head>
	<title>{env.PUBLIC_BRANDING_NAME} — {env.PUBLIC_BRANDING_TAGLINE}</title>
	<meta
		name="description"
		content={`${env.PUBLIC_BRANDING_NAME} allows you to ask meaningful questions to dive into thoughtful conversations`}
	/>
</svelte:head>

<Hero />

<div class="relative -top-[50px] mx-auto mb-12 max-w-screen-sm drop-shadow-xl">
	<article
		class="overflow-hidden border bg-white px-10 pb-10 pt-9 text-xl antialiased sm:rounded-xl"
	>
		<h1 class="mb-4 text-2xl font-bold">
			{env.PUBLIC_BRANDING_NAME} allows you to ask meaningful questions to dive into thoughtful conversations
		</h1>
		<p class="mb-4">
			Long thoughtful discussions such as the ones found in podcasts are great. Their length allows
			for conversations to develop into thought-provoking ideas. However these ideas are often hard
			to find — hidden within thousands of hours of&nbsp;conversation.
		</p>
		<p>
			{env.PUBLIC_BRANDING_NAME} tries to understand these conversations and give insight to your questions.
		</p>
	</article>
</div>
