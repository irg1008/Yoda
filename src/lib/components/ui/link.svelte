<script lang="ts">
	import { page } from '$app/stores';

	export let href: string;
</script>

<a {href} {...$$restProps} class:active={$page.url.pathname === href}>
	<slot />
</a>

<style lang="postcss">
	a[role='button']:not(.active):not(:hover) {
		@apply bg-transparent;
	}

	.active {
		@apply bg-accent;
	}
</style>
