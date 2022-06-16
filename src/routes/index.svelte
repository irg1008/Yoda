<script lang="ts">
	import Output from '$lib/components/common/completion.svelte';
	import Spinner from '$lib/components/ui/spinner.svelte';
	import type { PromptData } from '$lib/db/models';
	import { modalStore } from '$lib/stores';
	import { consts } from '$lib/openai/config/consts';
	import { openaiService } from '$lib/services';
	import type { Generation } from '@prisma/client';
	import Send from 'carbon-icons-svelte/lib/SendAlt.svelte';

	export let apiKey: string = '';
	export let apiKeyError: string = '';

	let title = '';
	let completion: Generation;
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
		if (data) completion = data;
	};

	// On completion change.
	$: if (completion) {
		modalStore.open(Output, { completion });
	}
</script>

<Spinner {loading} />

<section>
	<h1 class="title">Long Title</h1>

	<form on:submit|preventDefault={() => sendTitle()} novalidate>
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
</style>
