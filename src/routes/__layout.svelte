<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/components/layout/navbar/index.svelte';
</script>

<Navbar />
<main>
	<slot />
</main>

<style global lang="postcss">
	label {
		@apply block
		font-semibold;
	}

	body {
		@apply bg-slate-100;
	}

	main {
		@apply p-8
		max-w-screen-xl
		m-auto;
	}

	h1 {
		@apply font-bold
		text-4xl
		uppercase
		w-fit
		mb-8;
	}

	form {
		@apply w-fit;
	}

	input,
	textarea {
		@apply block
		p-2
		my-2
		rounded-lg
		border-2
		border-neutral-400
		focus:border-neutral-500
		outline-none
		bg-transparent;
	}

	button,
	[type='submit'],
	[type='reset'],
	[type='button'],
	a[role='button'] {
		@apply py-2
		px-4
		rounded-lg
		text-slate-50
		bg-slate-700
		hover:bg-slate-800
		uppercase
		transition-all
		duration-200
		font-bold;
	}

	hr {
		@apply my-8;
	}

	.error {
		@apply text-red-500;
	}
</style>
