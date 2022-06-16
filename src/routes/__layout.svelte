<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/components/layout/navbar.svelte';
	import Modal from '$lib/components/layout/modal.svelte';
	import { browser } from '$app/env';
</script>

{#if browser}
	<Modal />
	<Navbar />
	<main>
		<slot />
	</main>
{/if}

<style global lang="postcss">
	.title {
		@apply bg-gradient-to-r
    from-rose-600
    to-rose-400
    bg-clip-text
    text-transparent
    text-6xl
    w-full
    text-center;
	}

	label {
		@apply block
		font-semibold;
	}

	body {
		@apply bg-neutral-50;
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
		mb-8;
	}

	h2 {
		@apply font-semibold
		text-2xl
		uppercase
		mb-4;
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
		bg-transparent
		w-fit
		min-w-[4em];
	}

	button,
	[type='submit'],
	[type='reset'],
	[type='button'],
	a[role='button'] {
		@apply py-2
		px-4
		rounded-lg
		text-neutral-50
		bg-rose-700
		hover:bg-rose-800
		uppercase
		transition-all
		duration-200
		font-bold;
	}

	hr {
		@apply my-8
		w-full;
	}

	.error {
		@apply text-red-500;
	}
</style>
