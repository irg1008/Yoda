<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/components/layout/navbar.svelte';
	import Modal from '$lib/components/layout/modal.svelte';
	import { themeStore } from '$lib/stores';

	themeStore.loadTheme();
</script>

<svelte:head><title>YODA - AI Title Shortener</title></svelte:head>

<Modal />
<Navbar />
<main>
	<slot />
</main>

<style global lang="postcss">
	.title {
		@apply bg-gradient-to-r
    from-prim
    to-tert
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
		@apply bg-light
		text-darker;
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
		border-medium
		focus:border-dark
		outline-none
		bg-transparent
		w-fit
		transition-all
		duration-200
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
		text-lighter
		bg-sec
		hover:bg-accent
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
