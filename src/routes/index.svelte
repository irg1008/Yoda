<script lang="ts">
	import Spinner from '$lib/components/ui/spinner.svelte';
	import type { PromptData } from '$lib/db/models';
	import { consts } from '$lib/openai/config/consts';
	import openaiService from '$lib/services/openai.service';
	import Send from 'carbon-icons-svelte/lib/SendAlt.svelte';

	export let apiKey: string = '';
	export let apiKeyError: string = '';

	let title = '';
	let completion = '';
	let loading = false;

	let errors: Record<keyof PromptData, string> = {
		apiKey: apiKeyError,
		title: ''
	};

	const sendTitle = async () => {
		loading = true;
		const { data, error } = await openaiService.getCompletion(apiKey, title);
		loading = false;
		errors = error ?? { apiKey: '', title: '' };
		completion = data?.completion ?? '';
	};
</script>

<Spinner {loading} />

<section>
	<h1>Result</h1>

	<span class="completion">
		{#if completion}
			<h2>{completion}</h2>
		{:else}
			<p>Send a prompt to get a completion here</p>
		{/if}
	</span>

	<hr />

	<h1>Prompt</h1>

	<form on:submit|preventDefault={() => sendTitle()}>
		<div>
			<label for="key">Api Key</label>
			<input id="key" bind:value={apiKey} type="text" placeholder="i.e.:1234-5678-9876" />
			{#if errors.apiKey}
				<span class="error">{errors.apiKey}</span>
			{/if}
		</div>

		<div>
			<label for="title">Title (max {consts.maxPromptLength})</label>
			<textarea
				id="title"
				bind:value={title}
				placeholder="i.e.: Samsung Series 9 UE43AU9005K 109.2 cm (43) 4K Ultra HD Smart TV Wifi Negro"
				maxlength={consts.maxPromptLength}
			/>
			{#if errors.title}
				<span class="error">{errors.title}</span>
			{/if}
		</div>

		<button type="submit"><Send size={24} />Send</button>
	</form>
</section>

<style lang="postcss">
	h1 {
		@apply bg-gradient-to-r
    from-slate-600
    to-cyan-600
    bg-clip-text
    text-transparent
    text-6xl
    w-full
    text-center;
	}

	h2 {
		@apply text-3xl;
	}

	div,
	input,
	textarea {
		@apply w-full
    max-w-md;
	}

	textarea {
		@apply h-[120px]
		resize-none;
	}

	form {
		@apply w-full
    flex
    flex-col
    justify-center
    items-center
    gap-6;
	}

	button {
		@apply flex
    gap-2;
	}

	section {
		@apply max-w-lg
		m-auto;
	}

	.completion {
		@apply text-center;
	}
</style>
