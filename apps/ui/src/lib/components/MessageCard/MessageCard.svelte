<script lang="ts">
	// A message card is displayed with a title and optional message.
	// It can optionally have child content below the title/message.
	export let title: string;
	export let message: string | null = null;
</script>

<div class="mx-auto mb-12 max-w-screen-sm drop-shadow-xl">
	<article class="mx-8 rounded-lg border bg-white p-8 md:rounded-xl">
		<p class="text-2xl" class:mb-2={message || $$slots}>{title}</p>
		{#if message}<p>{message}</p>{/if}
		<slot />
	</article>
</div>
