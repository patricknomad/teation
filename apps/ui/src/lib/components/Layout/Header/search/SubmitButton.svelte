<script lang="ts">
	export let queryValue: string;
	export let urlQueryValue: string;

	$: currentValueIsSameAsUrl = queryValue === urlQueryValue;
</script>

<button
	type="submit"
	class="mt-2 inline-block h-10 rounded-full bg-purple-600 px-6 py-2 text-center text-sm text-white hover:bg-purple-700 disabled:bg-purple-300 sm:h-12 sm:text-base md:mt-0 md:h-16 lg:px-10"
	disabled={!queryValue || currentValueIsSameAsUrl}
>
	Search
</button>
