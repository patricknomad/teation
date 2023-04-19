<script context="module" lang="ts">
	import { env } from '$env/dynamic/public';
	import questions from '$lib/data/questions.json';

	let shownQuestions: string[] = [];
	let lastQuestionIndex = -1;
</script>

<script lang="ts">
	export let queryValue: string;
	export let urlQueryValue: string;
	export let mobile = false;

	// The Random Question button changes location based on the screen size.
	// - On mobile, it is displayed below the search input beside the submit button.
	// - On desktop, it is displayed to the right of the search input.
	// - See Search.svelte to see how they're included in the layout.
	// The buttons are shown/hidden based on the tailwind styles below (e.g. md:inline-block)
	const mobileClasses =
		'hidden h-16 rounded-r-full border border-gray-300 bg-gray-100 py-0 pl-3 pr-4 text-sm text-gray-600 hover:bg-gray-200 hover:text-gray-900 disabled:bg-gray-100 disabled:text-gray-300 md:inline-block lg:pl-6 lg:pr-7 lg:text-base lg:font-medium';
	const desktopClasses =
		'mt-2 inline-block h-10 rounded-full border border-gray-300 bg-gray-100 px-2 py-2 text-sm text-gray-600 hover:bg-gray-200 hover:text-gray-900 disabled:bg-gray-100 disabled:text-gray-300 sm:h-12 sm:px-6 sm:text-base md:hidden';

	// Display a new question when the button is clicked, however prevent it from
	// displaying the same question multiple times. Once all questions have been
	// displayed, reset shownQuestions in order for the cycle can start again.
	function cycleRandomQuestion() {
		let newQuestion;

		// Get a new question. Either sequentially or randomly based on env variable.
		if (env.PUBLIC_USE_SEQUENTIAL_QUESTIONS) {
			newQuestion = questions[++lastQuestionIndex % questions.length];
		} else {
			newQuestion = questions[Math.floor(Math.random() * questions.length)];
		}

		// If the new question is the same as the URL query or
		// has already been shown, then get a new question.
		if (urlQueryValue === newQuestion || shownQuestions.includes(newQuestion)) {
			cycleRandomQuestion();
			return;
		}

		shownQuestions.push(newQuestion);

		// Once all questions have been shown, reset shownQuestions
		if (shownQuestions.length >= questions.length - 1) {
			shownQuestions = [];
		}

		queryValue = newQuestion;
	}
</script>

<button class={mobile ? mobileClasses : desktopClasses} type="button" on:click={cycleRandomQuestion}
	>Random Question</button
>
