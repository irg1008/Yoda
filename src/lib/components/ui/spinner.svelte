<script lang="ts">
	import { Moon as Spinner } from 'svelte-loading-spinners';
	import { fade } from 'svelte/transition';

	export let loading: boolean;
</script>

{#if loading}
	<div
		transition:fade
		class="h-screen w-full bg-neutral-600/60 backdrop-blur-sm grid place-content-center absolute left-0 top-0"
	>
		<Spinner size="60" color="#fff" unit="px" duration="1s" />
	</div>
{/if}

<style lang="postcss">
	div {
		@apply z-50;
	}
</style>
