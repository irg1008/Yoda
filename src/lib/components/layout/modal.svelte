<script lang="ts">
	import { clickOutside } from '$lib/actions';
	import { modalStore } from '$lib/stores';
	import Close from 'carbon-icons-svelte/lib/Close.svelte';
	import { backOut } from 'svelte/easing';
	import { fade, fly } from 'svelte/transition';

	const { close, modal } = modalStore;

	const closeModal = () => close();

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			event.preventDefault();
			closeModal();
		}
	};
</script>

<svelte:window on:keydown={handleKeyDown} />

{#if $modal}
	<dialog open transition:fade={{ duration: 200 }}>
		<article
			transition:fly={{ duration: 300, y: -100, easing: backOut }}
			use:clickOutside={closeModal}
		>
			<button class="close-btn" on:click={() => closeModal()}>
				<Close size={24} />
			</button>
			<svelte:component this={$modal.component} {...$modal.props} />
		</article>
	</dialog>
{/if}

<slot />

<style lang="postcss">
	dialog {
		@apply fixed
		h-screen
		w-full
		top-0
		left-0
		bg-lighter/40
		backdrop-blur-sm
		z-40
		flex
		sm:p-4
		p-0
		md:items-center
		items-start
		justify-center;
	}

	article {
		@apply bg-lighter
		text-darker
		sm:rounded-xl
		p-8
		w-full
		overflow-auto
		max-h-full
		max-w-4xl
		shadow-2xl
		shadow-darker/5
		relative;
	}

	.close-btn {
		@apply aspect-square
		absolute
		right-0
		top-0
		m-4
		bg-lighter
		hover:bg-light
		text-darker
		p-2;
	}
</style>
