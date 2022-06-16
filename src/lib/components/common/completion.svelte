<script lang="ts">
	import type { Generation } from '@prisma/client';
	import Correct from 'carbon-icons-svelte/lib/FaceSatisfied.svelte';
	import Incorrect from 'carbon-icons-svelte/lib/FaceDissatisfied.svelte';
	import ArrowDown from 'carbon-icons-svelte/lib/ArrowDown.svelte';
	import { slide } from 'svelte/transition';
	import { suggestionService } from '$lib/services';

	export let completion: Generation;

	let markedAsCorrect: boolean;
	$: markedAsIncorrect = markedAsCorrect === false;
	$: hasGivenScore = markedAsCorrect || markedAsIncorrect;

	const suggest = async (correct: boolean, suggestionText?: string) => {
		return await suggestionService.suggest({
			generationId: completion.id,
			isCorrect: correct,
			suggestion: suggestionText
		});
	};

	const markAsCorrect = async () => {
		markedAsCorrect = true;
		await suggest(true);
	};

	const markAsIncorrect = async () => {
		markedAsCorrect = false;
	};

	let suggestionText: string;
	let suggestionError: string;
	let suggestedCorrectly = false;
	const sendSuggestion = async () => {
		const { error } = await suggest(false, suggestionText);
		suggestionError = error?.suggestion ?? '';
		suggestedCorrectly = !error;
	};
</script>

<header>
	<h1 class="title">Short Title</h1>
	<span class="input">{completion.input}</span>
	<ArrowDown size={24} />
	<h2 class="output">{completion.output}</h2>
</header>

<hr />

<footer class="score">
	<span class="opinion">Leave your opinion:</span>

	<div class="buttons" transition:slide>
		<button
			class="success-btn score-btn"
			disabled={hasGivenScore}
			class:selected={markedAsCorrect}
			on:click={() => markAsCorrect()}
		>
			<Correct size={32} />
		</button>
		<button
			class="error-btn score-btn"
			disabled={hasGivenScore}
			class:selected={markedAsIncorrect}
			on:click={() => markAsIncorrect()}
		>
			<Incorrect size={32} />
		</button>
	</div>

	{#if hasGivenScore}
		{#if markedAsCorrect}
			<span class="input" transition:slide> We are glad! You may try another one </span>
		{:else if markedAsIncorrect}
			{#if suggestedCorrectly}
				<span class="input" transition:slide>
					Thanks for the suggestion! Please try another one
				</span>
			{:else}
				<form on:submit|preventDefault={() => sendSuggestion()} novalidate transition:slide>
					<span class="input suggestion-title">
						So sorry it didn't work. Please leave a suggestion for this title:
					</span>

					<div class="field">
						<label for="text">Your suggestion</label>
						<input
							id="text"
							type="text"
							placeholder="Some cool short title"
							bind:value={suggestionText}
						/>
						{#if suggestionError}
							<span class="error">{suggestionError}</span>
						{/if}
					</div>

					<button type="submit">Send</button>
				</form>
			{/if}
		{/if}
	{/if}
</footer>

<style lang="postcss">
	.output {
		@apply text-3xl
		normal-case
		italic;
	}

	.input {
		@apply text-lg;
	}

	.opinion {
		@apply italic;
	}

	header {
		@apply flex
		flex-col
		items-center
		justify-center
		gap-2;
	}

	.buttons {
		@apply flex
		gap-6;
	}

	.field {
		@apply flex
		flex-col
		justify-center
		items-center;
	}

	.score {
		@apply flex
		flex-col
		items-center
		justify-center
		gap-6;
	}

	form {
		@apply flex
		flex-col
		mt-4
		gap-6
		items-center
		justify-center;
	}

	.suggestion-title {
		@apply max-w-[40ch];
	}

	.score-btn {
		@apply rounded-full
		aspect-square
		transition-transform
		duration-200
		flex
		items-center
		justify-center
		text-neutral-50;
		&:not(.selected) {
			@apply hover:scale-105;
			&:disabled {
				@apply opacity-50
				scale-100;
			}
		}
	}

	.success-btn {
		@apply bg-emerald-400;
		&:not(:disabled) {
			@apply hover:bg-emerald-500;
		}
	}

	.error-btn {
		@apply bg-red-400;
		&:not(:disabled) {
			@apply hover:bg-red-500;
		}
	}

	.selected {
		@apply scale-125;
		&.error-btn {
			@apply bg-red-500;
		}
		&.success-btn {
			@apply bg-emerald-500;
		}
	}
</style>
